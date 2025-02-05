import { NextResponse } from "next/server";
import documentationPrisma from '../../../../lib/documentation-prisma';

export async function GET(req, {params}) {
    let docid = params.id;

    const id = parseInt(docid);

    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid ID provided" }), { status: 400 });
    }

    try {
        const document = await documentationPrisma.document.findUnique({
            where: { id: id },
            select: {
                id: true,
                title: true,
                subtitle: true,
                Block: true
            },
        });

        if (!document) {
            return new Response(JSON.stringify({ error: "Document not found" }), { status: 404 });
        }

        return NextResponse.json(document);
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
