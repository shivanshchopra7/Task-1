import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-accent/5">
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-md mx-auto space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-muted">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          
          {/* Error Message */}
          <div className="space-y-3">
            <h1 className="text-6xl sm:text-7xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          {/* Action */}
          <div className="pt-4">
            <Link to="/">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
