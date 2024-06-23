import { query } from "./_generated/server";
import { mutation } from "@/convex/_generated/server";
import { v } from "convex/values";

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
