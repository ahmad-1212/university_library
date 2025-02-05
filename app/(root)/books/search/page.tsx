import Search from "@/components/Search";
import React, { Suspense } from "react";
import SearchedBooks from "@/components/SearchedBooks";
import Spinner from "@/components/ui/spinner";

const LIMIT = 3;

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { query, page } = await searchParams;

  return (
    <>
      <section className="library">
        <h6 className="library-subtitle">discover your next great read:</h6>
        <h1 className="library-title">
          Explore and Search for <span className="text-primary">Any Book </span>{" "}
          In Our Library
        </h1>
        <p>Search</p>
        <Search placeholder="Search a book by it's Title or Author..." />
      </section>
      {query && (
        <Suspense
          fallback={
            <div className="text-light-100 text-xl text-center flex items-center mt-10 justify-center gap-2">
              <Spinner variant="white" className="size-6" />
              Loading...
            </div>
          }
        >
          <SearchedBooks query={query} limit={LIMIT} page={page} />
        </Suspense>
      )}
    </>
  );
};

export default Page;
