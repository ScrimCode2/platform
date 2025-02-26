import documentationPrisma from '../../../lib/documentation-prisma';

export async function GET(req) {
  try {
    const documents = await documentationPrisma.document.findMany({
      select: {
        id: true,
        title: true,
        subtitle: true,
        createdAt: true,
        Block: true
      },
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify(documents), { status: 200 });
  } catch (error) {
    console.error(error); // Логи ошибок
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
