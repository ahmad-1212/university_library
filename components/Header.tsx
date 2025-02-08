"use client";

import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";
import { logOut } from "@/lib/actions/auth";
import Spinner from "./ui/spinner";

interface Props {
  session: Session;
  userRole: "ADMIN" | "USER" | null;
}

const Header = ({ session, userRole }: Props) => {
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignout = async () => {
    setIsLoading(true);
    await logOut();
    setIsLoading(false);
  };

  return (
    <header className="my-10 flex justify-between gap-3 sm:gap-5">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="max-md:hidden text-2xl font-semibold text-white">
          BookWise
        </h1>
      </Link>
      <ul className="flex flex-row items-center gap-4 sm:gap-8">
        <li>
          <Link
            href="/"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName === "/" ? "text-light-200" : "text-light-100"
            )}
          >
            Home
          </Link>
        </li>
        {userRole === "ADMIN" && (
          <li>
            <Link
              href="/admin"
              className={cn(
                "text-base cursor-pointer capitalize text-light-100"
              )}
            >
              Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link
            href="/books/search"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName === "/books/search" ? "text-light-200" : "text-light-100"
            )}
          >
            Search
          </Link>
        </li>

        <li>
          <Link href="/my-profile" className="flex gap-2 items-center">
            <Avatar className="size-9">
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name ?? "IN")}
              </AvatarFallback>
            </Avatar>
            <p className="text-light-100  font-semibold max-sm:hidden">
              {session?.user?.name?.split(" ")[0]}
            </p>
          </Link>
        </li>
        <li>
          {isLoading ? (
            <div>
              <Spinner variant="white" className="size-7" />
            </div>
          ) : (
            <Image
              src="/icons/logout.svg"
              width={28}
              height={28}
              alt="logout"
              className="cursor-pointer"
              onClick={onSignout}
            />
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
