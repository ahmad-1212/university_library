import { Session } from "next-auth";
import React from "react";
import Search from "../Search";

interface Props {
  session: Session;
}

const Header = async ({ session }: Props) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          {session?.user?.name}
        </h2>
        <p className="text-slate-500 text-base">
          Monitor all of your users and books here
        </p>
      </div>
      <Search
        isAdmin={true}
        placeholder="Search users, books by title, author, or genre"
      />
    </header>
  );
};

export default Header;
