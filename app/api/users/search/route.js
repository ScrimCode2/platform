import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || '';

    try {
        const users = await prisma.users.findMany({
            where: {
                OR: [
                  { username: { contains: query, mode: 'insensitive' } },
                  { chatId: { contains: query, mode: 'insensitive' } },
                ],
              },
        });

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
        status: 500,
    });
    }
}