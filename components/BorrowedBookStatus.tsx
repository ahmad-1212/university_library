import Image from "next/image";
import React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime);

interface Props {
  dueDate: string;
  returnDate?: string | null;
  status?: "BORROWED" | "RETURNED";
}

const BorrowedBookStatus = ({ dueDate, returnDate, status }: Props) => {
  const timeLeft = dayjs(dueDate).toNow(true);
  const isOverdue = dayjs().isAfter(dueDate);
  const isReturned = status === "RETURNED";
  const statusDiv = isReturned ? (
    <div className="flex items-center gap-1 text-light-100">
      <Image src="/icons/tick.svg" width={21} height={21} alt="book" />
      <p>Returned on {dayjs(returnDate).format("DD MMM")}</p>
    </div>
  ) : isOverdue ? (
    <div className="flex items-center gap-1 text-light-100">
      <Image src="/icons/warning.svg" width={21} height={21} alt="book" />
      <p className="text-red-400">Overdue Return</p>
    </div>
  ) : (
    <div className="flex items-center gap-1 text-light-100">
      <Image src="/icons/calendar.svg" width={21} height={21} alt="book" />
      <p>{timeLeft} left to due</p>
    </div>
  );
  return statusDiv;
};

export default BorrowedBookStatus;
