import { BookSearchParams, OpenLibraryResponse } from "@/types/book";

const BASE_URL = "https://openlibrary.org";

export async function searchBooks({ query, page, limit = 20 }: BookSearchParams): Promise<OpenLibraryResponse> {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    limit: limit.toString(),
    fields: "key,title,author_name,first_publish_year,cover_i,subject,isbn,publisher,language,number_of_pages_median"
  });

  const response = await fetch(`${BASE_URL}/search.json?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.statusText}`);
  }
  
  return response.json();
}

export function getCoverUrl(coverId: number | undefined, size: 'S' | 'M' | 'L' = 'L'): string | null {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export const QUICK_FILTERS = [
  "Science",
  "Mathematics", 
  "History",
  "Biology",
  "Astronomy",
  "Fiction",
  "Philosophy",
  "Psychology"
];