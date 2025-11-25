import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, type KeyboardEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";
import { CustomLogo } from "./CustomLogo";
const CustomHeader = () => {
  const { gender } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDownInSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = inputRef.current?.value || "";
      const newSearchParams = new URLSearchParams();
      if (!query) {
        setSearchParams(newSearchParams);
      } else {
        newSearchParams.set("query", query);
        setSearchParams(newSearchParams);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <CustomLogo />

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender ? "" : "underline underline-offset-4 font-bold"
              )}
            >
              All
            </Link>
            <Link
              to="/gender/men"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender !== "men" ? "" : "underline underline-offset-4 font-bold"
              )}
            >
              Men
            </Link>
            <Link
              to="/gender/women"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender !== "women"
                  ? ""
                  : "underline underline-offset-4 font-bold"
              )}
            >
              Women
            </Link>
            <Link
              to="gender/kid"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender !== "kid" ? "" : "underline underline-offset-4 font-bold"
              )}
            >
              Kids
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 w-64 h-9 bg-white"
                  onKeyDown={handleKeyDownInSearch}
                  ref={inputRef}
                  defaultValue={query}
                />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Future button for shopping cart. TO DO */}
            {/* <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button> */}
            <Link to="/auth/login">
              <Button variant="default"> Login </Button>
            </Link>
            <Link to="/admin">
              <Button variant="destructive"> Admin </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default CustomHeader;
