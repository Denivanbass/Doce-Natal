"use server";


import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";

export async function updateProfile(
  userId: number,
  formData: FormData
) {
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");

  const contact = String(formData.get("contact") || "");
  const professional_name = String(
    formData.get("professional_name") || ""
  );
  const category = String(formData.get("category") || "");
  const description = String(formData.get("description") || "");
  const experience = String(formData.get("experience") || "");
  const website = String(formData.get("website") || "");
  const city = String(formData.get("city") || "");
  const country = String(formData.get("country") || "");

  const photo = formData.get("photo");

  let photoUrl: string | undefined;

  if (photo instanceof File && photo.size > 0) {
    const extensions: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    };

    if (!extensions[photo.type]) {
      throw new Error("Formato de imagem inválido.");
    }

    if (photo.size > 5 * 1024 * 1024) {
      throw new Error("A imagem deve ter no máximo 5 MB.");
    }

    const buffer = Buffer.from(await photo.arrayBuffer());

    const fileName = `usuario-${userId}-${randomUUID()}${extensions[photo.type]}`;

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads"
    );

    await mkdir(uploadDir, { recursive: true });

    await writeFile(
      path.join(uploadDir, fileName),
      buffer
    );

    photoUrl = `/uploads/${fileName}`;
  }

  await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      contact,
      professional_name,
      category,
      description,
      experience,
      website,
      city,
      country,

      ...(photoUrl && {
        photo_url: photoUrl,
      }),

      updated_at: new Date(),
    },
  });

  redirect(`/profile/${userId}`);
}