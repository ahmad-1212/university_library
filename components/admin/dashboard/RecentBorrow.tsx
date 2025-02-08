import React from "react";

import Link from "next/link";
import { getBorrowRecords } from "@/app/admin/borrow-records/page";
import BookStripe from "./BookStripe";
import Image from "next/image";

const RecentBorrow = async () => {
  const { list } = await getBorrowRecords({ limit: 5 });
  await new Promise((res) => setTimeout(res, 3000));

  if (list.length === 0)
    return (
      <div className="flex items-center gap-3 flex-col justify-center py-10">
        <Image
          src="/images/no-borrowed.png"
          width={160}
          height={160}
          alt="no pending req"
        />
        <h3 className="font-bold">No Pending Book Requests</h3>
        <p className="text-sm text-dark-700 text-center">
          There are no borrow book requests awaiting your review at this time.
        </p>
      </div>
    );

  return (
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
  );
};

export default RecentBorrow;
