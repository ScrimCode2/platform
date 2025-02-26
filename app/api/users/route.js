import { shopPrisma } from '../../../lib/shop-prisma';

export async function PUT(req) {
  const { id, username, balance, chatId } = await req.json();

  try {
    const updatedUser = await shopPrisma.users.update({
      where: { id: id },
      data: {
        username,
        balance: parseFloat(balance),
        chatId,
        updatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET(req) {
    try {
      const users = await shopPrisma.users.findMany();
      return new Response(JSON.stringify(users), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }