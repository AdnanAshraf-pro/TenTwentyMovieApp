export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  [key: string]: any;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  homepage: string;
  budget: number;
  revenue: number;
  tagline: string;
  status: string;
  vote_average: number;
  vote_count: number;
  spoken_languages: SpokenLanguage[];
  production_companies: ProductionCompany[];
  origin_country: string[];
  original_language: string;
  imdb_id: string;
  adult: boolean;
}