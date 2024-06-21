"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserProfile = () => {
  const session = useSession();
  return (
    <Image
      className="aspect-square rounded-full"
      src={session?.data?.user?.image || ""}
      width={24}
      height={24}
      alt="user profile"
    />
  );
};

export default UserProfile;
