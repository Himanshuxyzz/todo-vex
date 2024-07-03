"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import Task from "./task";
import { CircleCheckBig } from "lucide-react";
import Todos from "./todos";
import CompletedTodos from "./completed-todos";
import { AddTaskWrapper } from "../add-tasks/add-task-button";

const TodoList = () => {
  const todos = useQuery(api.todos.get) ?? [];
  const completedTodos = useQuery(api.todos.completedTodos) ?? [];
  const incompleteTodos = useQuery(api.todos.incompleteTodos) ?? [];
  const totalCompletedTodos = useQuery(api.todos.totalCompletedTodos) ?? 0;

  if (
    todos === undefined ||
    completedTodos === undefined ||
    incompleteTodos === undefined
  ) {
    <p className="text-black">Loading...</p>;
  }
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Inbox</h1>
      </div>

      <div className="flex flex-col gap-1 py-4">
        <AddTaskWrapper />
      </div>

      <div className="flex flex-col gap-1 py-4">
        <Todos items={incompleteTodos} />
      </div>

      <div className="flex flex-col gap-1 py-4">
        <Todos items={completedTodos} />
      </div>
      <CompletedTodos totalTodos={totalCompletedTodos} />
    </div>
  );
};

export default TodoList;

/*
[
  {
    description: "had to complete this so that i can make next project",
    dueDate: 0,
    isCompleted: false,
    labelId: "k57a7m1yvmdq9d6k3d8s2pg6ys6vks14",
    priority: 1,
    projectId: "k97aj3nnrrkgrwpyhfb0cjsdz16vjyne",
    taskName: "Complete the project tutorial",
    userId: "jn715rjhjjf4e61z5dywbrhkfn6vhz7m",
  },
  
]
*/
