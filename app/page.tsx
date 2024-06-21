"use client";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/actions/auth-action";

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col gap-2.5 justify-center items-center">
      <h1 className="font-bold text-center text-2xl ">
        next js boiler plate ✨
      </h1>

      <form action={signInAction}>
        <Button>Click me!</Button>
      </form>
    </main>
  );
}
