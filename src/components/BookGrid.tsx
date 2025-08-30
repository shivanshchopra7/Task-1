import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useEffect } from "react";
import { Book } from "@/types/book";
import { BookCard } from "./BookCard";
import { Skeleton } from "@/components/ui/skeleton";

interface BookGridProps {
  books: Book[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
}

export function BookGrid({ books, hasNextPage, isFetchingNextPage, fetchNextPage }: BookGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  // Calculate columns based on screen size with better responsive breakpoints
  const getColumnsCount = () => {
    if (typeof window === "undefined") return 4;
    const width = window.innerWidth;
    if (width >= 1400) return 6;      // 2xl screens
    if (width >= 1200) return 5;      // xl screens
    if (width >= 1024) return 4;      // lg screens
    if (width >= 768) return 3;       // md screens
    if (width >= 640) return 2;       // sm screens
    return 1;                          // xs screens
  };

  // Calculate responsive row height based on screen size
  const getRowHeight = () => {
    if (typeof window === "undefined") return 480;
    const width = window.innerWidth;
    if (width >= 768) return 440;     // md and larger screens
    if (width >= 640) return 440;     // sm screens
    return 400;                        // xs screens
  };

  const columns = getColumnsCount();
  const rowHeight = getRowHeight();
  const rows = Math.ceil(books.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rows + (hasNextPage ? 1 : 0), // +1 for loading row
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight, // Responsive row height
    overscan: 3,
  });

  // Recalculate heights on window resize
  useEffect(() => {
    const handleResize = () => {
      rowVirtualizer.measure();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [rowVirtualizer]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (
      lastItem.index >= rows - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
    rows
  ]);

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-120px)] sm:h-[calc(100vh-160px)] md:h-[calc(100vh-200px)] overflow-auto scrollbar-hide mobile-smooth-scroll"
      style={{
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoadingRow = virtualRow.index >= rows;
          
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isLoadingRow ? (
                <LoadingRow columns={columns} />
              ) : (
                <BookRow 
                  books={books}
                  rowIndex={virtualRow.index}
                  columns={columns}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BookRow({ books, rowIndex, columns }: { books: Book[]; rowIndex: number; columns: number }) {
  const startIndex = rowIndex * columns;
  const rowBooks = books.slice(startIndex, startIndex + columns);

  return (
    <div 
      className="grid gap-3 sm:gap-4 md:gap-5 p-2 sm:p-3 md:p-4 h-full" 
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {rowBooks.map((book, index) => (
        <div key={`${book.key}-${startIndex + index}`} className="animate-slide-up h-full">
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}

function LoadingRow({ columns }: { columns: number }) {
  return (
    <div 
      className="grid gap-3 sm:gap-4 md:gap-5 p-2 sm:p-3 md:p-4 h-full" 
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <div key={index} className="space-y-4 h-full flex flex-col">
          {/* Cover skeleton - Responsive height to match BookCard */}
          <Skeleton className="h-[180px] sm:h-[200px] md:h-[220px] lg:h-[260px] xl:h-[320px] w-full rounded-lg flex-shrink-0" />
          {/* Content skeleton - Responsive height to match BookCard content */}
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" /> {/* Title height */}
              <div className="space-y-2 min-h-[2.5rem] flex flex-col justify-center">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}