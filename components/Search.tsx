"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Props {
  placeholder: string;
  isAdmin?: boolean;
}

const Search = ({ placeholder, isAdmin = false }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState<string>(
    () => searchParams.get("query") || ""
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // Update query state
  };

  useEffect(() => {
    const debounceDelay = setTimeout(() => {
      const currentParams = new URLSearchParams(searchParams.toString());

      // Always remove "page" when query changes
      if (currentParams.has("page")) {
        currentParams.delete("page");
      }

      // Update query or remove it
      if (query) {
        currentParams.set("query", query);
      } else {
        currentParams.delete("query");
      }

      // Construct the new URL
      const newUrl = `${pathname}?${currentParams.toString()}`;
      router.push(newUrl, { scroll: false });
    }, 200);

    return () => clearTimeout(debounceDelay);
  }, [query]);

  return (
    <form className={isAdmin ? "admin-search" : "search"}>
      <Image
        src={isAdmin ? "/icons/admin/search.svg" : "/icons/search-fill.svg"}
        width={25}
        height={25}
        alt="Search icon"
        aria-hidden="true"
      />
      <Input
        className={isAdmin ? "admin-search_input" : "search-input"}
        value={query}
        onChange={handleInput}
        name="query"
        placeholder={placeholder}
        aria-label="Search"
      />
    </form>
  );
};

export default Search;
