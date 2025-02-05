import { getRequestedUsers } from "@/app/admin/account-requests/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const RecentRequest = async () => {
  const { usersList } = await getRequestedUsers({ limit: 6 });

  await new Promise((res) => setTimeout(res, 2000));

  return (
    <section className="flex flex-col gap-10 bg-white p-5 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold ">Account Requests</h2>
        <Link href="/admin/account-requests" className="view-btn">
          View All
        </Link>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(max-content,200px))] justify-center   gap-4">
        {usersList.map((user) => (
          <li
            key={user.id}
            className="flex flex-1 flex-col  bg-light-300 py-3 px-3 justify-center overflow-hidden items-center rounded-lg"
          >
            <Avatar className="size-10 mb-2">
              <AvatarFallback className="bg-blue-500 text-light-100">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-sm">{user.fullName}</h3>
            <p className="text-xs line-clamp-1">{user.email}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentRequest;
