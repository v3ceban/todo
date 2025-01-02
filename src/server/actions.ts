"use server";

import { auth } from "./auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateUser = async (e: FormData) => {
  const session = await auth();
  const fistName = e.get("firstName") as string;
  const lastName = e.get("lastName") as string;
  const name = `${fistName.trim()} ${lastName.trim()}`.trim();
  if (!session) {
    console.error("Unauthorized");
    return;
  }
  if (!name || name.length > 255) {
    console.error("Invalid name");
    return;
  }
  if (name === session.user.name) {
    return;
  }

  try {
    await db
      .update(users)
      .set({
        name: `${fistName} ${lastName}`,
      })
      .where(eq(users.id, session.user.id));
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to update profile", error);
    return;
  }
};
