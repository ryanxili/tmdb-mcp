# TMDB MCP Server

Model Context Protocol (MCP) server for The Movie Database (TMDB) API.

## Features

- **Search**: movies, TV shows, people, multi
- **Trending**: daily/weekly for movies, TV, all
- **Movies**: popular, top_rated, now_playing, upcoming, details, credits, similar, recommendations, videos
- **TV**: popular, top_rated, airing_today, on_the_air, details, credits, similar, videos
- **People**: details, movie_credits, tv_credits
- **Genres**: movie and TV genre lists

## Requirements

- Node.js >= 18
- TMDB API Key

## Installation

```bash
npm install @ryanxili/tmdb-mcp
```

## Quick Start

### Via npx

```bash
npx @ryanxili/tmdb-mcp
```

Set API key first:
```bash
TMDB_API_KEY=your_key npx @ryanxili/tmdb-mcp
```

## Local Development

```bash
# Clone
git clone https://github.com/ryanxili/tmdb-mcp.git
cd tmdb-mcp

# Install
npm install

# Run
export TMDB_API_KEY=your_key
npm start
```

## Configuration

Set your TMDB API key as an environment variable:

```bash
export TMDB_API_KEY="your_api_key_here"
```

Or the MCP server will prompt for API key if not set.

## Running

```bash
# With environment variable
TMDB_API_KEY=your_key npm start

# Or export first
export TMDB_API_KEY=your_key
npm start
```

## MCP Client Configuration

### Claude Desktop / OpenCode

Add to your MCP config:

```json
{
  "mcpServers": {
    "tmdb": {
      "command": "npx",
      "args": ["-y", "@ryanxili/tmdb-mcp"],
      "env": {
        "TMDB_API_KEY": "your_api_key"
      }
    }
  }
}
```

Or with local path:

```json
{
  "mcpServers": {
    "tmdb": {
      "command": "node",
      "args": ["/path/to/tmdb-mcp/index.js"],
      "env": {
        "TMDB_API_KEY": "your_api_key"
      }
    }
  }
}
```

## Implementation Note

This MCP server uses `curl` instead of native `fetch` for API requests because:

- Node.js built-in `fetch` does not respect system proxy settings (`http_proxy`/`https_proxy`)
- `curl` automatically uses proxy environment variables, ensuring compatibility with various network environments

## Available Tools

| Tool | Description |
|------|-------------|
| search_movie | Search movies by query |
| search_tv | Search TV shows by query |
| search_person | Search people by query |
| search_multi | Multi search (movies, TV, people) |
| trending_movie_day | Trending movies today |
| trending_movie_week | Trending movies this week |
| trending_tv_day | Trending TV today |
| trending_tv_week | Trending TV this week |
| trending_all_day | All trending today |
| trending_all_week | All trending this week |
| movie_popular | Popular movies |
| movie_top_rated | Top rated movies |
| movie_now_playing | Now playing movies |
| movie_upcoming | Upcoming movies |
| movie_details | Movie details by ID |
| movie_credits | Movie cast & crew |
| movie_similar | Similar movies |
| movie_recommendations | Movie recommendations |
| movie_videos | Movie videos/trailers |
| tv_popular | Popular TV shows |
| tv_top_rated | Top rated TV shows |
| tv_airing_today | TV airing today |
| tv_on_the_air | TV on the air |
| tv_details | TV show details |
| tv_credits | TV cast & crew |
| tv_similar | Similar TV shows |
| tv_videos | TV videos |
| person_details | Person details |
| person_movie_credits | Person movie credits |
| person_tv_credits | Person TV credits |
| genre_movie_list | Movie genres |
| genre_tv_list | TV genres |

## Language

All results are returned in Chinese (zh-CN) by default.

## Get TMDB API Key

1. Go to [TMDB](https://www.themoviedb.org/)
2. Create an account
3. Go to Settings > API
4. Generate your API key

## License

MIT
