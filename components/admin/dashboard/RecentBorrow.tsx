import React from "react";

import Link from "next/link";
import { getBorrowRecords } from "@/app/admin/borrow-records/page";
import BookStripe from "./BookStripe";

const RecentBorrow = async () => {
  const { list } = await getBorrowRecords({ limit: 5 });
  await new Promise((res) => setTimeout(res, 3000));
  return (
    <section className="flex flex-col gap-10 bg-white p-5 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold ">Borrow Requests</h2>
        <Link href="/admin/borrow-records" className="view-btn">
          View All
        </Link>
      </div>
      <ul className="flex flex-col gap-2">
        {list?.map((record) => (
          <BookStripe
            key={record.id}
            showBorrowedUser={true}
            {...record.user}
            {...record.book}
            borrowDate={record.borrowDate}
          />
        ))}
      </ul>
    </section>
  );
};

export default RecentBorrow;
