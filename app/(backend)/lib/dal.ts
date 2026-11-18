
import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { prisma } from "./prisma";



export const verifyAdmin = cache(async () => {
  const cookieStore = await cookies();

  // Altere "session" caso seu cookie tenha outro nome.
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login");
  }

  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET não configurado.");
  }

  let userId: number;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      {
        algorithms: ["HS256"],
      }
    );

    // O JWT precisa conter o campo id.
    const id = Number(payload.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      redirect("/login");
    }

    userId = id;
  } catch {
    redirect("/login");
  }

  // Confirma a existência e a função atual do usuário no banco.
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
});
