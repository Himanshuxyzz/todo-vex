"use client";
import React from "react";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CalendarIcon, Text } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { CardFooter } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import moment from "moment";

const FormSchema = z.object({
  taskName: z.string().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.date({ required_error: "A due date is required" }),
  priority: z.string().min(1, { message: "Please select a priority" }),
  projectId: z.string().min(1, { message: "Please select a project" }),
  labelId: z.string().min(1, { message: "Please select a label" }),
});

const AddTaskInline = ({
  setShowAddTask,
}: {
  setShowAddTask: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const projects = useQuery(api.projects.getProjects) ?? [];
  const labels = useQuery(api.labels.getLabels) ?? [];
  const createATodoMutation = useMutation(api.todos.createATodo);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      taskName: "",
      description: "",
      priority: "1",
      dueDate: new Date(),
      projectId: ("k97aj3nnrrkgrwpyhfb0cjsdz16vjyne" as Id<"projects">) || "",
      labelId: ("k57a7m1yvmdq9d6k3d8s2pg6ys6vks14" as Id<"labels">) || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast("You submitted the following values:", {
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    const { taskName, description, priority, dueDate, projectId, labelId } =
      data;
    if (projectId) {
      const mutationId = createATodoMutation({
        taskName,
        description,
        priority: parseInt(priority),
        dueDate: moment(dueDate).valueOf(),
        projectId: projectId as Id<"projects">,
        labelId: labelId as Id<"labels">,
      });

      if (mutationId != undefined) {
        toast("🦄 Created a task", {
          duration: 3000,
        });
      }
    }
  }

  return (
    <div>
      {JSON.stringify(form.getValues(), null, 2)}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 border-2 p-2 border-gray-200 my-2 rounded-xl px-3 pt-4 border-foreground/20"
        >
          {/* enter task input */}
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    id="taskName"
                    placeholder="Enter your Task name"
                    required
                    className="border-0 font-semibold text-lg"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* enter task input end*/}

          {/* enter description text area */}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-start gap-2">
                    <Text className="ml-auto h-4 w-4 opacity-50" />
                    <Textarea
                      id="description"
                      placeholder="Description"
                      required
                      className="resize-none"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          {/* enter description text area end*/}

          <div className="flex gap-2">
            {/* enter date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "flex gap-2 w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // disabled={(date) =>
                        //   date > new Date() || date < new Date("1900-01-01")
                        // }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* enter date field end */}

            {/* enter piority field */}

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={"1"}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4].map((priority, idx) => {
                        return (
                          <SelectItem key={idx} value={`${priority}`}>
                            priority {priority}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* enter piority field end */}

            {/* enter lableId field */}

            <FormField
              control={form.control}
              name="labelId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a label" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {labels?.map((label: Doc<"labels">, idx: number) => {
                        return (
                          <SelectItem value={label?._id} key={idx}>
                            {label?.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* enter labelId field end */}
          </div>

          {/* enter projectId field */}

          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects?.map((project: Doc<"projects">, idx: number) => {
                      return (
                        <SelectItem value={project?._id} key={idx}>
                          {project?.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* enter projectId field end */}

          <CardFooter className="flex flex-col lg:flex-row lg:justify-between gap-2 border-t-2 pt-3">
            <div className="w-full lg:w-1/4"></div>
            <div className="flex gap-3 self-end">
              <Button
                className="px-6 bg-gray-300/40 text-gray-950 hover:bg-gray-300"
                variant={"outline"}
                type="submit"
              >
                Add task
              </Button>
              <Button className="px-6" onClick={() => setShowAddTask(false)}>
                Cancel
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
};

export default AddTaskInline;
