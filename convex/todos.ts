import { query } from "./_generated/server";
import { mutation } from "@/convex/_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("todos").collect();
  },
});

export const completedTodos = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();
  },
});

export const incompleteTodos = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();
  },
});

export const totalCompletedTodos = query({
  args: {},
  handler: async (ctx, args) => {
    const todos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();
    return todos.length || 0;
  },
});

// Update the task with the given value
export const checkAtodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true });
    return newTaskId;
  },
});

// Update the task with the given value
export const unCheckAtodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false });
    return newTaskId;
  },
});

export const createATodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
  },

  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId }
  ) => {
    try {
      const newTaskId = await ctx.db.insert("todos", {
        userId: "jn715rjhjjf4e61z5dywbrhkfn6vhz7m" as Id<"users">,
        taskName,
        description,
        priority,
        dueDate,
        projectId,
        labelId,
        isCompleted: false,
      });
      return newTaskId;
    } catch (error) {
      console.log("Error occured during createATodo mutation", error);
      return "";
    }
  },
});
