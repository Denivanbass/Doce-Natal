
'use server';

import { prisma } from "../../lib/prisma";



type Product = {
  id: number;
  name: string;
  small_description: string;
  description: string;
  price: number;
  weight: string;
  tag: string | null;
  image: string;
};

type ProductResult =
  | { success: true; product: Product }
  | { success: false; error: string };

export async function getProductById(
  id: string
): Promise<ProductResult> {
  try {
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return {
        success: false,
        error: 'ID de produto inválido.',
      };
    }

    const product = await prisma.products.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
        small_description: true,
        description: true,
        price: true,
        weight: true,
        tag: true,
        image: true,
      },
    });

    if (!product) {
      return {
        success: false,
        error: 'Produto não encontrado.',
      };
    }

    return {
      success: true,
      product: {
        ...product,
        price: Number(product.price),
      },
    };

  } catch (error) {
    console.error('Erro ao buscar produto:', error);

    return {
      success: false,
      error: 'Erro ao carregar produto.',
    };
  }
}
