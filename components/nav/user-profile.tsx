"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { signOutAction } from "@/actions/auth-action";

const UserProfile = () => {
  const session = useSession();
  const imgUrl = session?.data?.user?.image || null;
  const userEmail = session?.data?.user?.email || null;
  const userName = session?.data?.user?.name || null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"secondary"}
          className="flex items-center justify-start gap-1 lg:gap-2 m-0 p-0 lg:px-3 lg:w-full bg-white cursor-pointer"
        >
          {imgUrl && (
            <Image
              className="aspect-square rounded-full border shadow-sm"
              src={imgUrl}
              width={30}
              height={30}
              alt={`${userName} user profile`}
            />
          )}
          <p className="font-semibold truncate">{userEmail}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="lg:w-full px-28 flex items-center justify-center">
          <form action={signOutAction}>
            <Button
              type="submit"
              variant={"ghost"}
              className="hover:text-primary text-center"
            >
              Sign out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
