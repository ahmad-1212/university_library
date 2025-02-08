"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { userRoles } from "@/constants";
import Image from "next/image";
import { changeUserRole } from "@/lib/admin/actions/user";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const UserRole = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const role = userRoles.find((itm) => itm.value === user.role?.toLowerCase());
  const userRoleObj = userRoles[0];
  const adminRoleObj = userRoles[1];

  const handleClick = async () => {
    setLoading(true);
    const result = await changeUserRole(user.id);
    setLoading(false);
    if (!result.success) {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    } else {
      router.refresh();
    }
  };

  return (
    <Popover>
      <PopoverTrigger
        className=" px-3 rounded-full"
        style={{
          backgroundColor: role?.bgColor,
          color: role?.textColor,
        }}
      >
        {role?.label}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-36 shadow-2xl flex flex-col gap-7"
      >
        <button
          onClick={user.role === "ADMIN" ? handleClick : () => {}}
          disabled={loading}
          className="flex justify-between disabled:opacity-80 disabled:cursor-not-allowed"
        >
          <h5
            className="px-3 rounded-full"
            style={{
              backgroundColor: userRoleObj.bgColor,
              color: userRoleObj.textColor,
            }}
          >
            User
          </h5>
          {role?.value === "user" && (
            <Image
              src="/icons/admin/check.svg"
              width={20}
              height={20}
              alt="tick"
            />
          )}
        </button>
        <button
          onClick={user.role === "USER" ? handleClick : () => {}}
          disabled={loading}
          className="flex justify-between disabled:opacity-80 disabled:cursor-not-allowed"
        >
          <h5
            className="px-3 rounded-full"
            style={{
              backgroundColor: adminRoleObj.bgColor,
              color: adminRoleObj.textColor,
            }}
          >
            Admin
          </h5>
          {role?.value === "admin" && (
            <Image
              src="/icons/admin/check.svg"
              width={20}
              height={20}
              alt="tick"
            />
          )}
        </button>
      </PopoverContent>
    </Popover>
  );
};
export default UserRole;
