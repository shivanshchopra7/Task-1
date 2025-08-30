A responsive, infinite-scrolling book explorer powered by the Open Library public API.
Explore thousands of books with large, image-first cards, smooth loading, and virtualized performance.
Features
Infinite Scrolling: Load more books as you scroll using TanStack Query + IntersectionObserver.
Virtualized Grid: Smooth performance even with 1000+ items using react-virtual.
Responsive Cards: Image-dominant cards with title, author(s), year, and subject chips.

Search & Filters:
Debounced search input (400ms)
Quick filter chips: science, mathematics, history, biology, astronomy
Skeleton placeholders while loading
URL query persistence

Tech Stack
Next.js (App Router) + TypeScript
TanStack Query for fetching & caching
react-virtual for virtualization
shadcn/ui + Tailwind CSS for UI components
