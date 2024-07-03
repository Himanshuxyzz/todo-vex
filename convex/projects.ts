import { query } from "./_generated/server";
import { v } from "convex/values";

export const getProjects = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("projects").collect();
  },
});
