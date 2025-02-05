import { NextResponse } from "next/server";
import documentationPrisma from '../../../../lib/documentation-prisma';

export async function POST(req) {
    try {
        const {title, subtitle} = await req.json();

        const newDoc = await documentationPrisma.document.create({
            data: {
                title,
                subtitle,
            }
        });
        return NextResponse.json(newDoc, {status: 201})
    } catch(err) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    };
}