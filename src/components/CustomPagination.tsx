import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router";
import { useMemo } from "react";

interface PaginationProps {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let queryPage = searchParams.get("page")
    ? parseInt(searchParams.get("page") || "")
    : 1;
  if (isNaN(queryPage)) {
    queryPage = 1;
  }

  const actualPage = useMemo(() => {
    if (queryPage > 0 && queryPage <= totalPages) {
      return queryPage;
    }
    return 1;
  }, [queryPage, totalPages]);
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={() =>
          setSearchParams((prev) => {
            prev.set("page", `${actualPage - 1}`);
            return prev;
          })
        }
        variant="outline"
        size="sm"
        disabled={actualPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => {
        return (
          <Button
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("page", (index + 1).toString());
                return prev;
              })
            }
            variant={actualPage === index + 1 ? "default" : "outline"}
            key={index}
            size="sm"
          >
            {index + 1}
          </Button>
        );
      })}
      {/* <Button variant="ghost" size="sm" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button> */}

      <Button
        onClick={() =>
          setSearchParams((prev) => {
            prev.set("page", `${actualPage + 1}`);
            return prev;
          })
        }
        variant="outline"
        size="sm"
        disabled={actualPage === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
