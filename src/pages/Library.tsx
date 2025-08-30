import { useState, useEffect, useMemo, useRef } from "react";
import { useInfiniteBooks, getAllBooksFromPages } from "@/hooks/useInfiniteBooks";
import { BookGrid } from "@/components/BookGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QUICK_FILTERS } from "@/lib/openLibrary";
import { Search, BookOpen, Sparkles } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export default function Library() {
  const [query, setQuery] = useState("science");
  const [searchInput, setSearchInput] = useState("science");
  const [isQuickFiltersVisible, setIsQuickFiltersVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const debouncedQuery = useDebounce(searchInput, 400);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteBooks({ query: debouncedQuery });

  const books = useMemo(() => getAllBooksFromPages(data?.pages || []), [data?.pages]);

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery]);

  const handleQuickFilter = (filter: string) => {
    setSearchInput(filter);
    setQuery(filter);
  };

  const totalCount = data?.pages?.[0]?.numFound || 0;

  // Scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      if (scrollDirection === 'down' && currentScrollY > 100) {
        setIsQuickFiltersVisible(false);
      } else if (scrollDirection === 'up') {
        setIsQuickFiltersVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto py-4">
          <div className="space-y-6">
            {/* Title and Stats */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-hero shadow-lg">
                  <BookOpen className= "h-6 w-6 md:h-7 md:w-7 text-white" />
                </div>
                <div className="space-y-1">
                  <h1 className="md:text-3xl text-2xl  font-bold text-foreground">Read Sphere</h1>
                  <p className="text-base text-muted-foreground">
                    {isLoading ? (
                      "Searching..."
                    ) : (
                      `${totalCount.toLocaleString()} books found for "${query}"`
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">{books.length} loaded</span>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-12 py-3 bg-background border-2 focus:border-primary transition-colors duration-200"
              />
            </div>

            {/* Quick Filters */}
         {/* Quick Filters */}
<div 
  className={`transition-all duration-300 ease-in-out ${
    isQuickFiltersVisible 
      ? 'opacity-100 translate-y-0' 
      : 'opacity-0 -translate-y-4 pointer-events-none'
  }`}
>
  <div className="flex gap-3 overflow-x-auto sm:flex-wrap sm:overflow-visible px-2 pb-2 sm:pb-0">
    {QUICK_FILTERS.map((filter) => (
      <Badge
        key={filter}
        variant={query === filter ? "default" : "secondary"}
        className="px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105 min-w-max"
        onClick={() => handleQuickFilter(filter)}
      >
        {filter}
      </Badge>
    ))}
  </div>
</div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-2">
        {isError ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-6">
            <div className="p-4 rounded-full bg-destructive/10">
              <BookOpen className="h-16 w-16 text-destructive" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Something went wrong</h2>
              <p className="text-muted-foreground max-w-md">
                {error instanceof Error ? error.message : "Failed to load books"}
              </p>
            </div>
            <Button onClick={() => window.location.reload()} size="lg">
              Try Again
            </Button>
          </div>
        ) : books.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-6">
            <div className="p-4 rounded-full bg-muted">
              <BookOpen className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">No books found</h2>
              <p className="text-muted-foreground max-w-md">
                Try searching for something else or use one of the quick filters above.
              </p>
            </div>
          </div>
        ) : (
          <BookGrid
            books={books}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </main>
    </div>
  );
}