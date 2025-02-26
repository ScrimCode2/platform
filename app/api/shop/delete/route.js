import { NextResponse } from 'next/server'
import { shopPrisma } from '../../../../lib/shop-prisma'

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const id = searchParams.get('id')

    if (!['category', 'subcategory', 'product'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid deletion type' },
        { status: 400 }
      )
    }

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    let result
    switch (type) {
      case 'category':
        // Проверка существования категории
        // eslint-disable-next-line no-case-declarations
        const category = await shopPrisma.categories.findUnique({
          where: { id: parseInt(id) }
        })
        if (!category) {
          return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
          )
        }
        // Каскадное удаление через Prisma
        result = await shopPrisma.categories.delete({
          where: { id: parseInt(id) }
        })
        break

      case 'subcategory':
        // eslint-disable-next-line no-case-declarations
        const subcategory = await shopPrisma.subcategories.findUnique({
          where: { id: parseInt(id) }
        })
        if (!subcategory) {
          return NextResponse.json(
            { error: 'Subcategory not found' },
            { status: 404 }
          )
        }
        result = await shopPrisma.subcategories.delete({
          where: { id: parseInt(id) }
        })
        break

      case 'product':
        // eslint-disable-next-line no-case-declarations
        const product = await shopPrisma.products.findUnique({
          where: { id: parseInt(id) }
        })
        if (!product) {
          return NextResponse.json(
            { error: 'Product not found' },
            { status: 404 }
          )
        }
        result = await shopPrisma.products.delete({
          where: { id: parseInt(id) }
        })
        break
    }

    return NextResponse.json(
      { success: true, message: `${type} deleted successfully` },
      { status: 200 }
    )

  } catch (error) {
    console.error('Delete Error:', error)
    return NextResponse.json(
      { 
        error: 'Deletion failed',
        details: error.message,
        code: error.code
      },
      { status: 500 }
    )
  }
}