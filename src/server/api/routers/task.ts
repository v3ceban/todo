import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { tasks } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string().min(3).max(255) }))
    .mutation(async ({ ctx, input }) => {
      const [newTask] = await ctx.db
        .insert(tasks)
        .values({
          content: input.content,
          createdBy: ctx.session.user.id,
        })
        .returning();

      return newTask;
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
      const updateData: {
        isCompleted?: boolean;
        content?: string;
        completedAt?: Date | null;
      } = {};
      if (input.isCompleted !== undefined) {
        updateData.isCompleted = input.isCompleted;
        updateData.completedAt = input.isCompleted ? new Date() : null;
      }
      if (input.content !== undefined) {
        updateData.content = input.content;
      }
      await ctx.db.update(tasks).set(updateData).where(eq(tasks.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(tasks).where(eq(tasks.id, input.id));
    }),
});
