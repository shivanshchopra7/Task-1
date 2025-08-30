import { useInfiniteQuery } from "@tanstack/react-query";
import { searchBooks } from "@/lib/openLibrary";
import { Book } from "@/types/book";

interface UseInfiniteBooksOptions {
  query: string;
  enabled?: boolean;
}

export function useInfiniteBooks({ query, enabled = true }: UseInfiniteBooksOptions) {
  return useInfiniteQuery({
    queryKey: ["books", query],
    queryFn: async ({ pageParam = 1 }) => {
      return searchBooks({ query, page: pageParam });
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce((sum, page) => sum + page.docs.length, 0);
      return totalLoaded < lastPage.numFound ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: enabled && !!query,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function getAllBooksFromPages(pages: any[]): Book[] {
  return pages?.flatMap(page => page.docs) || [];
}