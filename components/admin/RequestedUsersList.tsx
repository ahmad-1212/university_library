import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback } from "../ui/avatar";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import config from "@/lib/config";
import RequestedUserAction from "./RequestedUserAction";
import { cn } from "@/lib/utils";

const RequestedUsersList = ({ users }: { users: User[] }) => {
  return (
    <Table>
      <TableHeader className="">
        <TableRow className="bg-light-700/70 hover:bg-light-700/70 border-none text-sm">
          <TableHead className="w-[25%] font-normal text-black p-3">
            Name
          </TableHead>
          <TableHead className="font-normal text-black ">Date Joined</TableHead>

          <TableHead className=" font-normal text-black ">
            University ID No
          </TableHead>
          <TableHead className=" font-normal text-black ">
            University ID Card
          </TableHead>
          <TableHead className=" font-normal text-black ">Status</TableHead>
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
              <h4 className="font-bold">{user.fullName}</h4>
            </TableCell>
            <TableCell className="font-medium text-dark-700">
              {dayjs(user.createdAt).format("MMM DD YYYY")}
            </TableCell>
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
            <TableCell
              className={cn(
                "font-medium",
                user.status === "REJECTED" && "text-red-600"
              )}
            >
              {user.status}
            </TableCell>
            <TableCell className="font-medium flex justify-end items-center">
              <RequestedUserAction user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RequestedUsersList;
