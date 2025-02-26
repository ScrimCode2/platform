import { NextResponse } from 'next/server'
import prisma from '../../../../lib/documentation-prisma'
// const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    
    if (!body.documentId || !body.type || !body.content) {
      return NextResponse.json(
        { error: "Необходимые поля отсутствуют" },
        { status: 400 }
      )
    }

    // определение порядкового индекса
    const lastBlock = await prisma.block.findFirst({
      where: { documentId: Number(body.documentId) },
      orderBy: { orderIndex: 'desc' },
    })

    const newOrderIndex = (lastBlock?.orderIndex ?? -1) + 1

    const newBlock = await prisma.block.create({
      data: {
        documentId: Number(body.documentId),
        type: body.type,
        content: body.content,
        language: body.type,
        orderIndex: newOrderIndex,
      },
    });

    return NextResponse.json(newBlock, { status: 201 })

  } catch (error) {
    console.error('Full error details:', {
      errorMessage: error.message,
      errorStack: error.stack,
      // eslint-disable-next-line no-undef
      requestBody: body
    })
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  
  }
}