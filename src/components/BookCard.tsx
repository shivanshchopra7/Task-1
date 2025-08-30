import { Book } from "@/types/book";
import { getCoverUrl } from "@/lib/openLibrary";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const coverUrl = getCoverUrl(book.cover_i);
  const authors = book.author_name?.slice(0, 2).join(", ") || "Unknown Author";
  const subjects = book.subject?.slice(0, 3) || [];

  return (
<Card
  className="
    group cursor-pointer border-0 bg-card shadow-lg hover:shadow-xl 
    transition-all duration-300 ease-out overflow-hidden flex flex-col
    h-auto sm:h-auto md:min-h-[340px]   /* only enforce height on desktop */
  "
>
  {/* Cover Image */}
  <div
    className="
      relative w-full overflow-hidden
      max-h-[220px] sm:max-h-[260px] md:max-h-[320px]
      sm:aspect-[1] md:aspect-[2/3]   /* only keep aspect ratio on larger screens */
    "
  >
    {coverUrl ? (
      <img
        src={coverUrl}
        alt={`Cover of ${book.title}`}
        className="
          h-full w-full object-cover 
          transition-transform duration-300 group-hover:scale-105
        "
        loading="lazy"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
        <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
      </div>
    )}

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    {/* Hover badges */}
    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
      <div className="flex flex-wrap gap-1 sm:gap-1.5">
        {subjects.map((subject, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-white/90 text-black text-[9px] sm:text-[10px] font-medium hover:bg-white transition-colors duration-200"
          >
            {subject}
          </Badge>
        ))}
      </div>
    </div>
  </div>

  {/* Card Content */}
  <div className="flex flex-col justify-between flex-grow p-2 sm:p-3">
    <h3
      className="
        font-semibold text-xs sm:text-sm leading-snug sm:leading-tight 
        line-clamp-2 text-foreground group-hover:text-primary 
        transition-colors duration-200
      "
    >
      {book.title}
    </h3>

    <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
      <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1 font-medium">
        {authors}
      </p>
      {book.first_publish_year && (
        <p className="text-[11px] sm:text-xs text-muted-foreground/80">
          {book.first_publish_year}
        </p>
      )}
    </div>
  </div>
</Card>

  
  );
}

