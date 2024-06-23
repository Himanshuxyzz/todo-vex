import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const TodoList = () => {
  const todos = useQuery(api.todos.get);

  if (todos === undefined) {
    <p>Loading...</p>;
  }
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Inbox</h1>
      </div>
      <div className="flex flex-col gap-1 py-4"></div>
    </div>
  );
};

export default TodoList;
