"use client";

import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, setUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface Props {
  totalPages: number;
  variant: "dark" | "light";
}

const AppPagination = ({ totalPages, variant = "dark" }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [nextPage, setNextPage] = useState<string>("");
  const [previousPage, setPreviousePage] = useState<string>("");
  const [lastPage, setLastPage] = useState<string>("");

  const pageNumber = Number(searchParams.get("page")) || 1;
  const nextPageNumber =
    totalPages === pageNumber ? pageNumber : pageNumber + 1;
  const previousPageNumber = pageNumber === 1 ? pageNumber : pageNumber - 1;

  useEffect(() => {
    setPreviousePage(
      setUrlQuery(
        [{ key: "page", value: previousPageNumber.toString() }],
        window.location.href
      )
    );
    setNextPage(
      setUrlQuery(
        [{ key: "page", value: nextPageNumber.toString() }],
        window.location.href
      )
    );
    setLastPage(
      setUrlQuery(
        [{ key: "page", value: totalPages.toString() }],
        window.location.href
      )
    );
  }, [searchParams]);

  return (
    <Pagination id="pagination" className="mt-16">
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={previousPageNumber === 1 && pageNumber === 1}
            onClick={() => router.push(previousPage, { scroll: false })}
            className={
              variant === "dark"
                ? "pagination-btn_dark"
                : "pagination-btn_light"
            }
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={() =>
              pageNumber === totalPages &&
              router.push(previousPage, { scroll: false })
            }
            className={cn(
              variant === "dark"
                ? "pagination-btn_dark"
                : "pagination-btn_light",
              pageNumber < totalPages && "active"
            )}
          >
            {pageNumber < totalPages ? pageNumber : pageNumber - 1}
          </Button>
        </PaginationItem>
        {totalPages > 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis
                className={cn(
                  "rounded-lg",
                  variant === "dark"
                    ? "pagination-btn_dark"
                    : "pagination-btn_light"
                )}
              />
            </PaginationItem>
            <PaginationItem>
              <Button
                onClick={() => router.push(lastPage, { scroll: false })}
                className={cn(
                  variant === "dark"
                    ? "pagination-btn_dark"
                    : "pagination-btn_light",
                  pageNumber === totalPages && "active"
                )}
              >
                {totalPages}
              </Button>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <Button
            disabled={pageNumber === totalPages}
            className={
              variant === "dark"
                ? "pagination-btn_dark"
                : "pagination-btn_light"
            }
            onClick={() => router.push(nextPage, { scroll: false })}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
