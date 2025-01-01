import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { tasks } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        content: input.content,
        createdBy: ctx.session.user.id,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userTasks = await ctx.db
      .select()
      .from(tasks)
      .where(eq(tasks.createdBy, ctx.session.user.id))
      .orderBy(desc(tasks.createdAt));

    return userTasks ?? [];
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isCompleted: z.boolean().optional(),
        content: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updateData: { isCompleted?: boolean; content?: string } = {};
      if (input.isCompleted !== undefined) {
        updateData.isCompleted = input.isCompleted;
      }
      if (input.content !== undefined) {
        updateData.content = input.content;
      }
      await ctx.db
        .update(tasks)
        .set(updateData)
        .where(eq(tasks.id, input.id));
    }),
});
