'use server';


import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { prisma } from '../../lib/prisma';

export async function createProductAction(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const small_description = formData.get('small_description') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const weight = formData.get('weight') as string;
    const tag = formData.get('tag') as string | null;

    const imageUrl = formData.get('imageUrl') as string;
    const imageFile = formData.get('imageFile') as File | null;

    let finalImagePath = imageUrl;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = `${uniqueSuffix}-${imageFile.name.replace(/\s/g, '_')}`;

      // Aponta diretamente para a pasta 'uploads' na raiz do projeto (process.cwd())
      const uploadDir = path.join(process.cwd(), 'uploads');

      // Cria a pasta automaticamente se ela não existir
      await mkdir(uploadDir, { recursive: true });

      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);

      // Salvamos a rota personalizada que criaremos a seguir para servir a imagem
      finalImagePath = `/api/uploads/${filename}`;
    }

    await prisma.products.create({
      data: {
        name,
        small_description: small_description,
        description,
        price,
        weight,
        tag: tag || null,
        image: finalImagePath,
      },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Erro detalhado ao salvar produto:', error);
    return { success: false, error: 'Erro ao salvar o produto e a imagem.' };
  }
}