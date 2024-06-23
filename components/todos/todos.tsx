import React from "react";
import Task from "./task";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

const Todos = ({ items }: { items: Array<Doc<"todos">> }) => {
  const checkAtodo = useMutation(api.todos.checkAtodo);
  const unCheckAtodo = useMutation(api.todos.unCheckAtodo);

  const handleOnChangeTodo = (task: Doc<"todos">) => {
    if (task.isCompleted) {
      unCheckAtodo({ taskId: task._id });
    } else {
      toast("✅ Task has been completed", {
        description: "You're a rockstar",
        duration: 3000,
      });
      checkAtodo({ taskId: task._id });
    }
  };
  return (
    <div>
      {items.map((task: Doc<"todos">) => {
        return (
          <Task
            key={task._id}
            {...task}
            handleOnChange={() => handleOnChangeTodo(task)}
          />
        );
      })}
    </div>
  );
};

export default Todos;
