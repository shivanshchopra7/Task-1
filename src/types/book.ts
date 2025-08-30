export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
  isbn?: string[];
  publisher?: string[];
  language?: string[];
  number_of_pages_median?: number;
}

export interface OpenLibraryResponse {
  docs: Book[];
  numFound: number;
  start: number;
  numFoundExact: boolean;
}

export interface BookSearchParams {
  query: string;
  page: number;
  limit?: number;
}