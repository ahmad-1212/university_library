"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { borrowStatuses } from "@/constants";
import { changeBorrowStatus } from "@/lib/admin/actions/borrowBook";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const BookReturnStatus = ({ record }: { record: BorrowRecord }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const returnDate = dayjs(record.returnDate);
  const isLateReturn = returnDate.isAfter(record.dueDate);

  const status = borrowStatuses.find((itm) => {
    if (isLateReturn) {
      return itm.value === "overdue";
    } else {
      return itm.value === record.status.toLowerCase();
    }
  });

  const handleClick = async (value: string) => {
    try {
      setLoading(true);
      const result = await changeBorrowStatus(record.id, value);
      if (result.success) {
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Popover>
      <PopoverTrigger
        className="rounded-xl px-5 py-1"
        style={{ backgroundColor: status?.bgColor, color: status?.textColor }}
      >
        {status?.label}
      </PopoverTrigger>
      <PopoverContent className="w-40 flex flex-col gap-2 text-xs px-0 ">
        <h4 className="font-bold px-4">Change Status</h4>
        <ul className="flex flex-col">
          {borrowStatuses.map((sta) => (
            <li key={sta.value} className="hover:bg-gray-50 w-full px-4 py-2">
              <button
                disabled={loading}
                onClick={() => handleClick(sta.value)}
                style={{ backgroundColor: sta.bgColor, color: sta.textColor }}
                className="py-1 px-4 rounded-xl font-bold"
              >
                {sta.label}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default BookReturnStatus;
