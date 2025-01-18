import { NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';

export async function DELETE(request, { params }) {
    const userId = params.id;

    try {
        await prisma.reviews.deleteMany({
            where: {
                OR: [
                    { userId },
                    { deals: { buyerId: userId } },
                    { deals: { sellerId: userId } },
                ],
            },
        });

        await prisma.transactions.deleteMany({
            where: { userId },
        });

        await prisma.dealAgreements.deleteMany({
            where: { userId },
        });

        await prisma.deals.deleteMany({
            where: {
                OR: [
                    { buyerId: userId },
                    { sellerId: userId },
                ],
            },
        });

        const user = await prisma.users.delete({
            where: { id: userId },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete user. Check related data." },
            { status: 500 }
        );
    }
}
