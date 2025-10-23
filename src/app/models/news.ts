export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Article {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: Date;
  updated_at: Date;
  featured: boolean;
  launches: Launch[];
  events: Event[];
}

export interface ArticleResponse
  extends Omit<Article, 'published_at' | 'updated_at'> {
  published_at: string;
  updated_at: string;
}

export interface Author {
  name: string;
  socials: Socials | null;
}

export interface Socials {
  x?: string;
  youtube?: string;
  instagram?: string;
  linkedin?: string;
  mastodon?: string;
  bluesky?: string;
}

export interface Launch {
  id?: string;
  provider?: string;
}

export interface Event {
  id?: string;
  name?: string;
  date?: string;
}
