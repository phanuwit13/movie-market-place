export const ROOT_PATH = 'https://api.themoviedb.org/3/'
export const IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/'

export const ROUTE_API = {
  TREND_MOVIE: 'trending/movie/week',
  MOVIE_NOW_PLAYING: 'movie/now_playing',
  TV_AIRING_TODAY: 'tv/airing_today',
  TV_POPULAR: 'tv/popular',
}

export const ENV = {
  API_KEY: process.env['API_KEY'],
}
