import { query } from "./_generated/server";
import { v } from "convex/values";

export const getLabels = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("labels").collect();
  },
});
