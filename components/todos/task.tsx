import React from "react";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import clsx from "clsx";

const Task = ({
  taskName,
  _id,
  isCompleted,
  handleOnChange,
}: {
  // data: Doc<"todos">;
  taskName: string;
  _id: string;
  isCompleted: boolean;
  handleOnChange: any;
}) => {
  // const { taskName } = data;
  return (
    <div
      key={_id}
      className="flex items-center space-x-2 border-b-2 p-2 border-gray-100 animate-in fade-in"
    >
      <Dialog>
        <div className="flex gap-2 items-center justify-end w-full">
          <div className="flex gap-2 w-full">
            <Checkbox
              id="todo"
              className={clsx(
                "w-5 h-5 rounded-xl",
                isCompleted &&
                  "data-[state=checked]:bg-gray-300 border-gray-300"
              )}
              checked={isCompleted}
              onCheckedChange={handleOnChange}
            />
            <DialogTrigger asChild>
              <div className="flex flex-col items-start">
                <button
                  className={clsx(
                    "text-sm font-normal text-left",
                    isCompleted && "line-through text-foreground/30"
                  )}
                >
                  {taskName}
                </button>
              </div>
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogHeader className="w-full">
              <DialogTitle>{taskName}</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default Task;
