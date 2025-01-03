"use server";

import { auth } from "./auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { nameRegex } from "~/lib/utils";

export const updateUser = async ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const session = await auth();
  const name = `${firstName.trim()} ${lastName.trim()}`.trim();

  if (!session) {
    throw new Error("Unauthorized");
  }
  if (!name || name.length > 255) {
    throw new Error("Invalid input");
  }
  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    throw new Error(
      "Invalid characters in name. Only letters, hyphens, and apostrophes are allowed.",
    );
  }
  if (name === session.user.name) {
    return;
  }

  try {
    await db
      .update(users)
      .set({
        name: `${firstName} ${lastName}`,
      })
      .where(eq(users.id, session.user.id));
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to update profile", error);
    throw new Error("Failed to update profile. Please try again later.");
  }
};
