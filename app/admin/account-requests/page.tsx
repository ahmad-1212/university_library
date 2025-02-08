import RequestedUsersList from "@/components/admin/RequestedUsersList";
import AppPagination from "@/components/AppPagination";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { desc, ilike, or } from "drizzle-orm";
import React from "react";

export const getRequestedUsers = async ({
  query,
  page = 1,
  limit,
  condition,
}: {
  query?: string;
  page?: number;
  limit: number;
  condition?: any;
}): Promise<{ total: number; usersList: User[] }> => {
  const searchCondition = condition
    ? condition
    : or(ilike(users.fullName, `%${query}%`));
  const [total, requestedUsers] = await Promise.all([
    db.$count(users, query ? searchCondition : undefined),
    db
      .select()
      .from(users)
      .where(query || condition ? searchCondition : undefined)
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset((page - 1) * limit),
  ]);

  return {
    total,
    usersList: requestedUsers,
  };
};

const LIMIT = 10;
const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { query, page = "1" } = await searchParams;
  const { total, usersList } = await getRequestedUsers({
    query,
    page: Number(page) ?? 1,
    limit: LIMIT,
  });
  const totalPages = Math.ceil(total / LIMIT);
  return (
    <section className="bg-white flex flex-col gap-7 py-10 px-7 rounded-lg ]">
      <h2 className="font-bold text-xl">Account Registration Requests</h2>

      {/* Requested Users List */}
      {usersList.length > 0 ? (
        <RequestedUsersList users={usersList} />
      ) : (
        <div className="text-xl text-center my-20">No Users Found</div>
      )}
      {totalPages > 1 && (
        <AppPagination totalPages={totalPages} variant="light" />
      )}
    </section>
  );
};

export default Page;
