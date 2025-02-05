import React from "react";

import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";

import UsersList from "@/components/admin/UsersList";
import { and, count, eq, getTableColumns, ilike, or } from "drizzle-orm";
import AppPagination from "@/components/AppPagination";

const getUsers = async ({
  query,
  page = 1,
  limit,
}: {
  query?: string;
  page?: number;
  limit: number;
}): Promise<{ total: number; usersList: User[] }> => {
  const { password, lastActivityDate, ...rest } = getTableColumns(users);
  const searchCondition = and(
    eq(users.status, "APPROVED"),
    or(ilike(users.fullName, `%${query}%`), ilike(users.email, `%${query}%`))
  );

  const [total, usersList] = await Promise.all([
    db.$count(users, query ? searchCondition : eq(users.status, "APPROVED")),
    db
      .select({
        ...rest,
        borrowedBooks: count(borrowRecords.id),
      })
      .from(users)
      .where(query ? searchCondition : eq(users.status, "APPROVED"))
      .leftJoin(borrowRecords, eq(users.id, borrowRecords.userId))
      .groupBy(rest.id)
      .limit(limit)
      .offset((page - 1) * limit),
  ]);

  return {
    total,
    usersList,
  };
};

const LIMIT = 10;

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { query, page } = await searchParams;

  const { total, usersList } = await getUsers({
    query,
    page: Number(page) ?? 1,
    limit: LIMIT,
  });
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <section className="bg-white flex flex-col gap-7 py-10 px-7 rounded-lg ]">
      <h2 className="font-bold text-xl">All Users</h2>
      <UsersList users={usersList} />
      {totalPages > 1 && (
        <AppPagination totalPages={totalPages} variant="light" />
      )}
    </section>
  );
};

export default Page;
