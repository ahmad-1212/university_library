"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";
import BorrowedBookStatus from "./BorrowedBookStatus";
import Receipt from "./Receipt/Receipt";

interface Props {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
  borrowedRecord?: BorrowRecord;
}

const BorrowBook = ({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message },
  borrowedRecord,
}: Props) => {
  const [borrowing, setBorrowing] = useState<boolean>(false);
  const router = useRouter();
  const isReturned = borrowedRecord?.status === "RETURNED";
  const handleBorrow = async () => {
    console.log(isEligible);
    if (!isEligible) {
      return toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }

    setBorrowing(true);
    const result = await borrowBook({ bookId, userId });
    setBorrowing(false);
    if (result.success) {
      toast({
        title: "Success",
        description: "Book borrowed successfully",
      });

      router.push("/my-profile");
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  if (borrowedRecord && !isReturned) {
    return (
      <div>
        <BorrowedBookStatus
          status={borrowedRecord.status}
          dueDate={borrowedRecord.dueDate}
        />
        <Receipt
          bookAuthor={borrowedRecord.book.author!}
          bookGenre={borrowedRecord.book.genre!}
          bookTitle={borrowedRecord.book.title!}
          borrowDate={borrowedRecord.borrowDate!}
          dueDate={borrowedRecord.dueDate!}
          receiptId={borrowedRecord.id!}
        >
          <a className="book-overview_btn block">Upload Receipt</a>
        </Receipt>
      </div>
    );
  }

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing..." : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBook;
