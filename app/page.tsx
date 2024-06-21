"use client";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";




export default function Home() {
  const tasks = useQuery(api.tasks.get);

  return (
    <main className="h-screen w-full flex flex-col gap-2.5 justify-center items-center">
      <h1 className="font-bold text-center text-2xl ">
        next js boiler plate ✨
      </h1>
      <Button>Click me!
      </Button>
      <ul className="w-[3/2] border p-5 list-disc list-outside ">
        {tasks?.map(({ _id, text }) => <li className="text-xl pl-2" key={_id}>{text}</li>)}

      </ul>
    </main>
  );
}
