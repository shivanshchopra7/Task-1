import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 py-20 sm:py-24 md:py-28 relative">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-hero shadow-xl ring-2 ring-white/10">
                <BookOpen className="h-12 w-12 sm:h-14 sm:w-14 text-white" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-hero bg-clip-text text-transparent leading-tight tracking-tight">
              ReadSphere
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover millions of books with our{" "}
              <span className="text-primary font-semibold">infinite-scrolling explorer</span>.  
              Search, filter, and browse the world’s largest digital library.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-8 rounded-2xl bg-card border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Search className="h-8 w-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Smart Search</h3>
              <p className="text-muted-foreground">
                Find books instantly with our powerful search and quick filters
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Sparkles className="h-8 w-8 text-accent mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Beautiful Cards</h3>
              <p className="text-muted-foreground">
                Enjoy rich, image-first book cards with smooth animations
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <BookOpen className="h-8 w-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Infinite Browsing</h3>
              <p className="text-muted-foreground">
                Seamlessly browse thousands of books with virtualized scrolling
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 mx-auto items-center justify-center flex">
            <Link to="/library">
              <Button
                size="lg"
                className="bg-gradient-hero hover:brightness-110 text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 flex items-center gap-2"
              >
                Explore Books <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
