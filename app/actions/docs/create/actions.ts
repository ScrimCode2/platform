'use server';

import documentationPrisma from '../../../../lib/documentation-prisma';

export async function createPost(data: { title: string; subtitle: string }) {
  try {
    return await documentationPrisma.document.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
      },
    });
  } catch (error) {
    throw new Error('Failed to create post');
  }
}