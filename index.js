#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'zh-CN';

function getApiKey() {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('TMDB_API_KEY environment variable not set. Please set it or pass as argument.');
  }
  return apiKey;
}

async function tmdbRequest(endpoint, params = {}) {
  const apiKey = getApiKey();
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('language', LANGUAGE);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  }

  const { execSync } = await import('child_process');
  const result = execSync(`curl -s "${url.toString()}"`, { encoding: 'utf-8' });
  const json = JSON.parse(result);
  
  if (json.status_code) {
    throw new Error(json.status_message);
  }
  return json;
}

const server = new McpServer({
  name: 'tmdb-mcp',
  version: '1.0.0'
});

server.registerTool(
  'search_movie',
  {
    title: 'Search Movies',
    description: 'Search for movies by query',
    inputSchema: {
      query: z.string().describe('Search query'),
      page: z.number().optional().describe('Page number (1-1000)'),
      include_adult: z.boolean().optional().default(false).describe('Include adult content')
    }
  },
  async ({ query, page = 1, include_adult = false }) => {
    const result = await tmdbRequest('/search/movie', { query, page, include_adult });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'search_tv',
  {
    title: 'Search TV Shows',
    description: 'Search for TV shows by query',
    inputSchema: {
      query: z.string().describe('Search query'),
      page: z.number().optional().describe('Page number (1-1000)'),
      include_adult: z.boolean().optional().default(false).describe('Include adult content')
    }
  },
  async ({ query, page = 1, include_adult = false }) => {
    const result = await tmdbRequest('/search/tv', { query, page, include_adult });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'search_person',
  {
    title: 'Search People',
    description: 'Search for people by query',
    inputSchema: {
      query: z.string().describe('Search query'),
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ query, page = 1 }) => {
    const result = await tmdbRequest('/search/person', { query, page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'search_multi',
  {
    title: 'Multi Search',
    description: 'Search for movies, TV shows, and people',
    inputSchema: {
      query: z.string().describe('Search query'),
      page: z.number().optional().describe('Page number (1-1000)'),
      include_adult: z.boolean().optional().default(false).describe('Include adult content')
    }
  },
  async ({ query, page = 1, include_adult = false }) => {
    const result = await tmdbRequest('/search/multi', { query, page, include_adult });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'trending_movie_day',
  {
    title: 'Trending Movies Today',
    description: 'Get trending movies of the day',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ page = 1 }) => {
    const result = await tmdbRequest('/trending/movie/day', { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'trending_movie_week',
  {
    title: 'Trending Movies This Week',
    description: 'Get trending movies of the week',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ page = 1 }) => {
    const result = await tmdbRequest('/trending/movie/week', { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'trending_tv_day',
  {
    title: 'Trending TV Today',
    description: 'Get trending TV shows of the day',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ page = 1 }) => {
    const result = await tmdbRequest('/trending/tv/day', { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'trending_tv_week',
  {
    title: 'Trending TV This Week',
    description: 'Get trending TV shows of the week',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ page = 1 }) => {
    const result = await tmdbRequest('/trending/tv/week', { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'trending_all_day',
  {
    title: 'All Trending Today',
    description: 'Get all trending of the day (movies, TV, people)',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ page = 1 }) => {
    const result = await tmdbRequest('/trending/all/day', { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'trending_all_week',
  {
    title: 'All Trending This Week',
    description: 'Get all trending of the week (movies, TV, people)',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ page = 1 }) => {
    const result = await tmdbRequest('/trending/all/week', { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'movie_popular',
  {
    title: 'Popular Movies',
    description: 'Get popular movies',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)'),
      region: z.string().optional().describe('Region code (ISO 3166-1)')
    }
  },
  async ({ page = 1, region }) => {
    const result = await tmdbRequest('/movie/popular', { page, region });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'movie_top_rated',
  {
    title: 'Top Rated Movies',
    description: 'Get top rated movies',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)'),
      region: z.string().optional().describe('Region code (ISO 3166-1)')
    }
  },
  async ({ page = 1, region }) => {
    const result = await tmdbRequest('/movie/top_rated', { page, region });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'movie_now_playing',
  {
    title: 'Now Playing Movies',
    description: 'Get now playing movies in theaters',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)'),
      region: z.string().optional().describe('Region code (ISO 3166-1)')
    }
  },
  async ({ page = 1, region }) => {
    const result = await tmdbRequest('/movie/now_playing', { page, region });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'movie_upcoming',
  {
    title: 'Upcoming Movies',
    description: 'Get upcoming movies',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)'),
      region: z.string().optional().describe('Region code (ISO 3166-1)')
    }
  },
  async ({ page = 1, region }) => {
    const result = await tmdbRequest('/movie/upcoming', { page, region });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'movie_details',
  {
    title: 'Movie Details',
    description: 'Get movie details by ID',
    inputSchema: {
      movie_id: z.number().describe('TMDB movie ID')
    }
  },
  async ({ movie_id }) => {
    const result = await tmdbRequest(`/movie/${movie_id}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'movie_credits',
  {
    title: 'Movie Credits',
    description: 'Get movie cast and crew by ID',
    inputSchema: {
      movie_id: z.number().describe('TMDB movie ID')
    }
  },
  async ({ movie_id }) => {
    const result = await tmdbRequest(`/movie/${movie_id}/credits`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'movie_similar',
  {
    title: 'Similar Movies',
    description: 'Get similar movies by ID',
    inputSchema: {
      movie_id: z.number().describe('TMDB movie ID'),
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ movie_id, page = 1 }) => {
    const result = await tmdbRequest(`/movie/${movie_id}/similar`, { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'movie_recommendations',
  {
    title: 'Movie Recommendations',
    description: 'Get movie recommendations by ID',
    inputSchema: {
      movie_id: z.number().describe('TMDB movie ID'),
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ movie_id, page = 1 }) => {
    const result = await tmdbRequest(`/movie/${movie_id}/recommendations`, { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'movie_videos',
  {
    title: 'Movie Videos',
    description: 'Get movie videos (trailers, teasers, etc.) by ID',
    inputSchema: {
      movie_id: z.number().describe('TMDB movie ID')
    }
  },
  async ({ movie_id }) => {
    const result = await tmdbRequest(`/movie/${movie_id}/videos`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'tv_popular',
  {
    title: 'Popular TV Shows',
    description: 'Get popular TV shows',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ page = 1 }) => {
    const result = await tmdbRequest('/tv/popular', { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'tv_top_rated',
  {
    title: 'Top Rated TV Shows',
    description: 'Get top rated TV shows',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ page = 1 }) => {
    const result = await tmdbRequest('/tv/top_rated', { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'tv_airing_today',
  {
    title: 'TV Airing Today',
    description: 'Get TV shows airing today',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ page = 1 }) => {
    const result = await tmdbRequest('/tv/airing_today', { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'tv_on_the_air',
  {
    title: 'TV On The Air',
    description: 'Get TV shows currently on air',
    inputSchema: {
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ page = 1 }) => {
    const result = await tmdbRequest('/tv/on_the_air', { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'tv_details',
  {
    title: 'TV Details',
    description: 'Get TV show details by ID',
    inputSchema: {
      tv_id: z.number().describe('TMDB TV show ID')
    }
  },
  async ({ tv_id }) => {
    const result = await tmdbRequest(`/tv/${tv_id}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'tv_credits',
  {
    title: 'TV Credits',
    description: 'Get TV show cast and crew by ID',
    inputSchema: {
      tv_id: z.number().describe('TMDB TV show ID')
    }
  },
  async ({ tv_id }) => {
    const result = await tmdbRequest(`/tv/${tv_id}/credits`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'tv_similar',
  {
    title: 'Similar TV Shows',
    description: 'Get similar TV shows by ID',
    inputSchema: {
      tv_id: z.number().describe('TMDB TV show ID'),
      page: z.number().optional().describe('Page number (1-1000)')
    }
  },
  async ({ tv_id, page = 1 }) => {
    const result = await tmdbRequest(`/tv/${tv_id}/similar`, { page });
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'tv_videos',
  {
    title: 'TV Videos',
    description: 'Get TV show videos by ID',
    inputSchema: {
      tv_id: z.number().describe('TMDB TV show ID')
    }
  },
  async ({ tv_id }) => {
    const result = await tmdbRequest(`/tv/${tv_id}/videos`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'person_details',
  {
    title: 'Person Details',
    description: 'Get person details by ID',
    inputSchema: {
      person_id: z.number().describe('TMDB person ID')
    }
  },
  async ({ person_id }) => {
    const result = await tmdbRequest(`/person/${person_id}`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'person_movie_credits',
  {
    title: 'Person Movie Credits',
    description: 'Get person movie credits by ID',
    inputSchema: {
      person_id: z.number().describe('TMDB person ID')
    }
  },
  async ({ person_id }) => {
    const result = await tmdbRequest(`/person/${person_id}/movie_credits`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'person_tv_credits',
  {
    title: 'Person TV Credits',
    description: 'Get person TV credits by ID',
    inputSchema: {
      person_id: z.number().describe('TMDB person ID')
    }
  },
  async ({ person_id }) => {
    const result = await tmdbRequest(`/person/${person_id}/tv_credits`);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'genre_movie_list',
  {
    title: 'Movie Genres',
    description: 'Get list of movie genres',
    inputSchema: {}
  },
  async () => {
    const result = await tmdbRequest('/genre/movie/list');
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

server.registerTool(
  'genre_tv_list',
  {
    title: 'TV Genres',
    description: 'Get list of TV genres',
    inputSchema: {}
  },
  async () => {
    const result = await tmdbRequest('/genre/tv/list');
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
  }
);

const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);
