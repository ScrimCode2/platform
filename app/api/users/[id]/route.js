import { NextResponse } from "next/server";
import { shopPrisma } from '../../../../lib/shop-prisma';

export async function DELETE(request, { params }) {
    const userId = params.id;

    try {
        // await shopPrisma.reviews.deleteMany({
        //     where: {
        //         OR: [
        //             { userId },
        //             { deals: { buyerId: userId } },
        //             { deals: { sellerId: userId } },
        //         ],
        //     },
        // });

        await shopPrisma.transactions.deleteMany({
            where: { userId },
        });

        // await shopPrisma.dealAgreements.deleteMany({
        //     where: { userId },
        // });

        // await shopPrisma.deals.deleteMany({
        //     where: {
        //         OR: [
        //             { buyerId: userId },
        //             { sellerId: userId },
        //         ],
        //     },
        // });

        const user = await shopPrisma.users.delete({
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
