"use client";

import { logOut } from "@/lib/actions/auth";
import Image from "next/image";
import React, { useState } from "react";
import Spinner from "../ui/spinner";

const Logout = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    await logOut();
    setLoading(false);
  };
  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? (
        <div>
          <Spinner variant="black" className="w-[18px] h-[18px] border-[3px]" />
        </div>
      ) : (
        <Image src="/icons/logout.svg" width={18} height={18} alt="Logout" />
      )}
    </button>
  );
};

export default Logout;
