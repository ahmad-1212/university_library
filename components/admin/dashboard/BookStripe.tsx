import React from "react";
import BookCover from "@/components/BookCover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  id?: string;
  title?: string;
  coverUrl?: string;
  coverColor?: string;
  author?: string;
  genre?: string;
  fullName?: string;
  borrowDate?: Date;
  createdAt?: Date | null;
  showBorrowedUser: boolean;
}

const BookStripe = ({
  id,
  title,
  coverColor,
  coverUrl,
  author,
  genre,
  fullName,
  borrowDate,
  createdAt,
  showBorrowedUser = true,
}: Props) => {
  return (
    <li className="book-stripe">
      <BookCover
        variant="small"
        coverColor={coverColor || ""}
        coverImage={coverUrl || ""}
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <h2 className="title">{title}</h2>
          <Link
            href={
              showBorrowedUser
                ? `/admin/borrow-records?query=${fullName}`
                : `/admin/books/${id}`
            }
          >
            <Image
              src="/icons/admin/eye.svg"
              width={15}
              height={15}
              alt="view"
            />
          </Link>
        </div>
        <div className="author">
          <p>By {author}</p>
          <div></div>
          <p>{genre}</p>
        </div>
        <div className="user">
          {showBorrowedUser && (
            <div className="avatar">
              <Avatar className="size-7 ">
                <AvatarFallback className="text-xs bg-blue-500 text-white">
                  {getInitials(fullName || "I N")}
                </AvatarFallback>
              </Avatar>
              <p>{fullName}</p>
            </div>
          )}
          <div className="borrow-date">
            <Image
              src="/icons/admin/calendar.svg"
              width={15}
              height={15}
              alt="calendar"
            />
            <p>
              {borrowDate
                ? dayjs(borrowDate).format("MMM DD YYYY")
                : dayjs(createdAt).format("MMM DD YYYY")}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default BookStripe;
