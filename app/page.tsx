import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col gap-2.5 justify-center items-center">
      <h1 className="font-bold text-center text-2xl ">
        next js boiler plate ✨
      </h1>
      <Button>Click me!
      </Button>
    </main>
  );
}
