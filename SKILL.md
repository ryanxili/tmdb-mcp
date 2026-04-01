---
name: tmdb
description: The Movie Database (TMDB) API - 搜索电影、TV节目、演员，获取 trending、popular、top-rated 等内容。支持搜索电影、电视剧、人物，查看电影详情、演员阵容、相似影片等。
license: MIT
metadata:
  author: opencode
  version: "1.0"
  api_base: https://api.themoviedb.org/3
  tags:
    - tmdb
    - movie
    - tv
    - actor
    - trending
    - search
---

# TMDB API Skill

This skill enables AI agents to interact with The Movie Database (TMDB) API v3.

## When to Use This Skill

Use this skill when users:
- Search for movies, TV shows, or actors
- Get trending, popular, or top-rated content
- View movie/TV details, cast, crew, similar movies
- Get recommendations or discover new content

## API Configuration

- **Base URL:** `https://api.themoviedb.org/3`
- **Language:** `zh-CN` (Chinese Simplified)
- **Authentication:** API Key via `api_key` query parameter

### API Key Handling

1. First check for `TMDB_API_KEY` environment variable using `echo $TMDB_API_KEY`
2. If not found or empty, prompt user to enter API key manually using `read` command
3. Store in a session variable for current session only (do not persist)
4. Example session setup:

```bash
# Check if API key exists, if not prompt user
if [ -z "$TMDB_API_KEY" ]; then
  read -p "请输入 TMDB API Key: " TMDB_API_KEY
  export TMDB_API_KEY
fi
```

## Available Endpoints

### Search

| Endpoint | Description |
|----------|-------------|
| `/search/movie` | Search movies by query |
| `/search/tv` | Search TV shows by query |
| `/search/person` | Search people by query |
| `/search/multi` | Search movies, TV shows, and people |

### Trending

| Endpoint | Description |
|----------|-------------|
| `/trending/{media_type}/day` | Trending today |
| `/trending/{media_type}/week` | Trending this week |

### Movie

| Endpoint | Description |
|----------|-------------|
| `/movie/popular` | Popular movies |
| `/movie/top_rated` | Top rated movies |
| `/movie/now_playing` | Now playing in theaters |
| `/movie/upcoming` | Upcoming movies |
| `/movie/{movie_id}` | Movie details |
| `/movie/{movie_id}/credits` | Cast and crew |
| `/movie/{movie_id}/similar` | Similar movies |
| `/movie/{movie_id}/recommendations` | Recommendations |
| `/movie/{movie_id}/videos` | Videos (trailers) |

### TV

| Endpoint | Description |
|----------|-------------|
| `/tv/popular` | Popular TV shows |
| `/tv/top_rated` | Top rated TV shows |
| `/tv/airing_today` | Airing today |
| `/tv/on_the_air` | Currently on air |
| `/tv/{tv_id}` | TV show details |
| `/tv/{tv_id}/credits` | Cast and crew |
| `/tv/{tv_id}/similar` | Similar shows |
| `/tv/{tv_id}/recommendations` | Recommendations |
| `/tv/{tv_id}/videos` | Videos |

### Discover

| Endpoint | Description |
|----------|-------------|
| `/discover/movie` | Discover movies with filters |
| `/discover/tv` | Discover TV shows with filters |

### People

| Endpoint | Description |
|----------|-------------|
| `/person/{person_id}` | Person details |
| `/person/{person_id}/movie_credits` | Movie credits |
| `/person/{person_id}/tv_credits` | TV credits |

### Genres

| Endpoint | Description |
|----------|-------------|
| `/genre/movie/list` | Movie genres |
| `/genre/tv/list` | TV genres |

## How to Use (Bash)

### Initialization

```bash
# Check if API key exists
echo $TMDB_API_KEY

# If not set, you can prompt user:
# read -p "请输入 TMDB API Key: " TMDB_API_KEY
```

### Search Examples

```bash
# Search movies
curl -s "https://api.themoviedb.org/3/search/movie?api_key=$TMDB_API_KEY&language=zh-CN&query=流浪地球"

# Search TV shows
curl -s "https://api.themoviedb.org/3/search/tv?api_key=$TMDB_API_KEY&language=zh-CN&query=狂飙"

# Multi search
curl -s "https://api.themoviedb.org/3/search/multi?api_key=$TMDB_API_KEY&language=zh-CN&query=周杰伦"
```

### Trending Examples

```bash
# Trending movies today
curl -s "https://api.themoviedb.org/3/trending/movie/day?api_key=$TMDB_API_KEY&language=zh-CN"

# Trending TV this week
curl -s "https://api.themoviedb.org/3/trending/tv/week?api_key=$TMDB_API_KEY&language=zh-CN"
```

### Movie Examples

```bash
# Popular movies
curl -s "https://api.themoviedb.org/3/movie/popular?api_key=$TMDB_API_KEY&language=zh-CN"

# Top rated movies
curl -s "https://api.themoviedb.org/3/movie/top_rated?api_key=$TMDB_API_KEY&language=zh-CN"

# Movie details (by ID)
curl -s "https://api.themoviedb.org/3/movie/455476?api_key=$TMDB_API_KEY&language=zh-CN"

# Movie credits (cast & crew)
curl -s "https://api.themoviedb.org/3/movie/455476/credits?api_key=$TMDB_API_KEY&language=zh-CN"
```

### TV Examples

```bash
# Popular TV shows
curl -s "https://api.themoviedb.org/3/tv/popular?api_key=$TMDB_API_KEY&language=zh-CN"

# TV show details
curl -s "https://api.themoviedb.org/3/tv/66732?api_key=$TMDB_API_KEY&language=zh-CN"
```

### Person Examples

```bash
# Person details
curl -s "https://api.themoviedb.org/3/person/3036?api_key=$TMDB_API_KEY&language=zh-CN"

# Person movie credits
curl -s "https://api.themoviedb.org/3/person/3036/movie_credits?api_key=$TMDB_API_KEY&language=zh-CN"
```

### Genre Examples

```bash
# Movie genres
curl -s "https://api.themoviedb.org/3/genre/movie/list?api_key=$TMDB_API_KEY&language=zh-CN"
```

## Common Parameters

| Parameter | Description | Values |
|-----------|-------------|--------|
| `api_key` | Your API key | Required |
| `language` | Language for results | `zh-CN` |
| `query` | Search query | String |
| `page` | Page number | 1-1000, default 1 |
| `include_adult` | Include adult content | true/false |
| `region` | Region for content | ISO 3166-1 code |

## Response Format

### Search Response Example
```json
{
  "page": 1,
  "results": [
    {
      "id": 455476,
      "title": "流浪地球2",
      "original_title": "The Wandering Earth II",
      "overview": "太阳即将毁灭...",
      "poster_path": "/xxx.jpg",
      "vote_average": 7.5,
      "release_date": "2023-01-22"
    }
  ],
  "total_pages": 1,
  "total_results": 1
}
```

### Movie Details Example
```json
{
  "id": 455476,
  "title": "流浪地球2",
  "overview": "太阳即将毁灭...",
  "runtime": 173,
  "genres": [{"id": 878, "name": "科幻"}],
  "release_date": "2023-01-22",
  "vote_average": 7.5,
  "budget": 500000000,
  "production_companies": [...]
}
```

## Example Interactions

### User: "搜索科幻电影"

```bash
curl -s "https://api.themoviedb.org/3/search/movie?api_key=$TMDB_API_KEY&language=zh-CN&query=科幻"
```

### User: "现在流行的电影有哪些？"

```bash
curl -s "https://api.themoviedb.org/3/movie/popular?api_key=$TMDB_API_KEY&language=zh-CN&page=1"
```

### User: "流浪地球2的演员有哪些？"

```bash
curl -s "https://api.themoviedb.org/3/movie/455476/credits?api_key=$TMDB_API_KEY&language=zh-CN"
```

### User: "类似流浪地球的电影"

```bash
curl -s "https://api.themoviedb.org/3/movie/455476/similar?api_key=$TMDB_API_KEY&language=zh-CN"
```

### User: "吴京参演的电影"

```bash
# First search for the person
curl -s "https://api.themoviedb.org/3/search/person?api_key=$TMDB_API_KEY&language=zh-CN&query=吴京"
# Then get movie credits by person ID
curl -s "https://api.themoviedb.org/3/person/1287241/movie_credits?api_key=$TMDB_API_KEY&language=zh-CN"
```

### User: "今天的 trending TV"

```bash
curl -s "https://api.themoviedb.org/3/trending/tv/day?api_key=$TMDB_API_KEY&language=zh-CN"
```

### User: "高分电视剧"

```bash
curl -s "https://api.themoviedb.org/3/tv/top_rated?api_key=$TMDB_API_KEY&language=zh-CN&page=1"
```

## Best Practices

1. **Pagination**: Use `page` parameter for paginated results (max 1000 pages)
2. **Error Handling**: Check for API errors in response (status_code != 200)
3. **Image URLs**: Poster images use `https://image.tmdb.org/t/p/w500{poster_path}`
4. **Rate Limiting**: TMDB has rate limits; implement caching if needed
5. **Fallback**: If zh-CN data missing, fallback to en-US

## Performance Optimization

### 1. Field Filtering (Speed ↑)

Use `append_to_response` to reduce API calls, or filter fields locally with jq:

```bash
# Get movie details + credits in ONE request (instead of 2)
curl -s "https://api.themoviedb.org/3/movie/455476?api_key=$TMDB_API_KEY&language=zh-CN&append_to_response=credits"

# Filter only needed fields from saved file
jq -r '.cast[] | select(.popularity > 10) | {name, character, vote_average}' movies.json

# Extract title, year, rating only
jq -r '.results[] | "\(.release_date[0:4])\t\(.title)\t\(.vote_average)"' results.json
```

### 2. Result Filtering (Precision ↑)

Filter results with jq based on various criteria:

```bash
# Filter by minimum rating (≥7.0)
jq -r '.cast[] | select(.vote_average >= 7.0) | .title' movies.json

# Filter by year range (2000-2010)
jq -r '.cast[] | select(.release_date >= "2000" and .release_date < "2011") | .title' movies.json

# Filter by genre (requires genre IDs: 28=Action, 18=Drama, etc.)
jq -r '.results[] | select(.genre_ids | contains(28)) | .title' movies.json

# Combine multiple filters: rating ≥7 AND year ≥2015
jq -r '.results[] | select(.vote_average >= 7 and .release_date >= "2015") | .title' movies.json
```

### 3. Concurrent Requests (Speed ↑)

Fetch multiple pages simultaneously for large datasets:

```bash
# Parallel fetch first 5 pages (5x faster)
for i in {1..5}; do
  curl -s "https://api.themoviedb.org/3/person/21911/movie_credits?api_key=$TMDB_API_KEY&page=$i" &
done
wait

# Or use xargs for parallel processing
echo {1..5} | xargs -P5 -I{} curl -s "https://api.themoviedb.org/3/person/21911/movie_credits?api_key=$TMDB_API_KEY&page={}" > /tmp/page{}.json

# Merge all pages
jq -s 'add' /tmp/page*.json > /tmp/merged.json
```

### 4. Complete Workflow Example

```bash
# Fast: Parallel fetch + filter + sort
for i in {1..3}; do
  curl -s "https://api.themoviedb.org/3/person/21911/movie_credits?api_key=$TMDB_API_KEY&page=$i" > /tmp/pg$i.json &
done
wait

# Merge, filter (rating≥6.5), sort by year, format output
jq -s 'add | map(select(.vote_average >= 6.5)) | sort_by(.release_date)' /tmp/pg*.json | \
jq -r '.[] | "\(.release_date[0:4]) \(.title) (\(.vote_average))"'

# Cleanup
rm /tmp/pg*.json
```

### 5. Error Handling (Reliability ↑)

```bash
# With retry logic
fetch_with_retry() {
  local url=$1
  local max_retries=3
  local attempt=0
  
  while [ $attempt -lt $max_retries ]; do
    response=$(curl -s --max-time 10 "$url")
    if echo "$response" | jq -e '.status_code' >/dev/null 2>&1; then
      echo "Error: $(echo "$response" | jq -r '.status_message')" >&2
      attempt=$((attempt + 1))
      sleep 1
    else
      echo "$response"
      return 0
    fi
  done
  echo "Failed after $max_retries attempts" >&2
  return 1
}

# Check response validity before processing
response=$(curl -s "https://api.themoviedb.org/3/person/21911/movie_credits?api_key=$TMDB_API_KEY")
if echo "$response" | jq -e '.cast' >/dev/null 2>&1; then
  echo "$response" | jq '.cast | length'
else
  echo "API error: $(echo "$response" | jq -r '.status_message')"
fi
```

## Related Resources

- [TMDB API Documentation](https://developer.themoviedb.org/reference/getting-started)
- [TMDB API Reference](https://developer.themoviedb.org/reference)
