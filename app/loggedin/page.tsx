"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import UserProfile from "@/components/todovex/user-profile";

function page() {
  const tasks = useQuery(api.tasks.get);

  return (
    <main className="w-full">
      <div className="text-center mt-10 flex justify-center items-center gap-2">
        <UserProfile />
        <h1 className="text-3xl font-bold underline">
          Welcome to the logged in page!
        </h1>
      </div>

      <ul className="w-[3/2] border p-5 list-disc list-outside ">
        {tasks?.map(({ _id, text }) => (
          <li className="text-xl pl-2" key={_id}>
            {text}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default page;
