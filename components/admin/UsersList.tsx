import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInitials } from "@/lib/utils";
import dayjs from "dayjs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Image from "next/image";
import Link from "next/link";
import config from "@/lib/config";
import UserRole from "./UserRole";

interface Props {
  users: User[];
}

const UsersList = ({ users }: Props) => {
  return (
    <Table>
      <TableHeader className="">
        <TableRow className="bg-light-700/70 hover:bg-light-700/70 border-none text-sm">
          <TableHead className="w-[30%] font-normal text-black p-3">
            Name
          </TableHead>
          <TableHead className="font-normal text-black ">Date Joined</TableHead>
          <TableHead className="w-[10%] font-normal text-black ">
            Role
          </TableHead>
          <TableHead className="w-[15%] font-normal text-black ">
            Books Borrowed
          </TableHead>
          <TableHead className=" font-normal text-black ">
            University ID No
          </TableHead>
          <TableHead className=" font-normal text-black ">
            University ID Card
          </TableHead>
          <TableHead className=" font-normal text-black ">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow
            key={user.id}
            className="text-sm"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
          >
            <TableCell className="flex items-center gap-2 py-5">
              <Avatar className="bg-primary size-10">
                <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-between">
                <h4 className="font-bold">{user.fullName}</h4>
                <p className="text-light-500">{user.email}</p>
              </div>
            </TableCell>
            <TableCell className="font-medium text-dark-700">
              {dayjs(user.createdAt).format("MMM DD YYYY")}
            </TableCell>
            <TableCell>
              <UserRole user={user} />
            </TableCell>
            <TableCell className="font-medium">{user.borrowedBooks}</TableCell>
            <TableCell className="font-medium">{user.universityId}</TableCell>
            <TableCell className="font-medium">
              <Link
                href={
                  config.env.imageKit.urlEndpoint + "/" + user.universityCard
                }
                className="text-blue-400 flex items-center gap-1"
              >
                <span>View ID Card</span>
                <Image
                  src="/icons/admin/link.svg"
                  width={15}
                  height={15}
                  alt="link"
                />
              </Link>
            </TableCell>
            <TableCell className="font-medium flex justify-end items-center">
              <Image
                src="/icons/admin/trash.svg"
                width={20}
                height={20}
                alt="delete"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersList;
