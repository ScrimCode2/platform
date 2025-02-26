import { NextResponse } from 'next/server'
import { shopPrisma } from '../../../lib/shop-prisma'

const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter(field => !data[field])
  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(', ')}`
  }
  return null
}

let thisYear = new Date().getFullYear()


export async function GET() {
  try {
    // Проверка доступности модели
    if (!('categories' in shopPrisma)) {
      throw new Error('Prisma model "category" not found')
    }

    const categories = await shopPrisma.categories.findMany({
      include: {
        subcategories: {
          include: {
            products: true
          }
        }
      }
    })

    return NextResponse.json(categories)

  } catch (error) {
    console.error('API Error Details:', {
      message: error.message,
      prisma: shopPrisma.$isConnected,
      models: Object.keys(shopPrisma)
    })

    return NextResponse.json(
      {
        error: 'Database error',
        message: error.message,
        models: Object.keys(shopPrisma) // Для диагностики
      },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    const { type, data } = await req.json()
    
    // Проверка типа операции
    if (!['category', 'subcategory', 'product'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid operation type' },
        { status: 400 }
      )
    }

    let result
    switch (type) {
      case 'category':
        // eslint-disable-next-line no-case-declarations
        const categoryError = validateRequiredFields(data, ['name'])
        if (categoryError) {
          return NextResponse.json(
            { error: categoryError },
            { status: 400 }
          )
        }
        result = await shopPrisma.categories.create({
          data: {
            name: data.name,
            imagePath: data.imagePath || null,
            createdAt: new Date(thisYear, 6, 1).toISOString(),
            updatedAt: new Date(thisYear, 6, 1).toISOString()
          }
        })
        break

        case 'subcategory':
          // eslint-disable-next-line no-case-declarations
          const subcatError = validateRequiredFields(data, ['name', 'categoryId'])
          if (subcatError) {
            return NextResponse.json(
              { error: subcatError },
              { status: 400 }
            )
          }
        
          // Преобразуем categoryId в число
          // eslint-disable-next-line no-case-declarations
          const categoryId = parseInt(data.categoryId, 10)
          if (isNaN(categoryId)) {
            return NextResponse.json(
              { error: 'Invalid categoryId' },
              { status: 400 }
            )
          }
        
          // Проверка существования категории
          // eslint-disable-next-line no-case-declarations
          const categoryExists = await shopPrisma.categories.findUnique({
            where: { id: categoryId }
          })
          if (!categoryExists) {
            return NextResponse.json(
              { error: 'Parent category not found' },
              { status: 404 }
            )
          }
        
          result = await shopPrisma.subcategories.create({
            data: {
              name: data.name,
              categoryId: categoryId, // Используем преобразованное значение
              imagePath: data.imagePath || null,
              createdAt: new Date(thisYear, 6, 1).toISOString(),
              updatedAt: new Date(thisYear, 6, 1).toISOString()
            }
          })
          break

          case 'product':
            // eslint-disable-next-line no-case-declarations
            const productError = validateRequiredFields(data, [ 
              'name', 
              'price', 
              'stock', 
              'subcategoryId'
            ]);
            
            if (productError) {
              return NextResponse.json(
                { error: productError },
                { status: 400 }
              );
            }
          
            // Преобразуем и валидируем ID подкатегории
            // eslint-disable-next-line no-case-declarations
            const subcategoryId = parseInt(data.subcategoryId, 10);
            if (isNaN(subcategoryId)) {
              return NextResponse.json(
                { error: 'Invalid subcategory ID' },
                { status: 400 }
              );
            }
          
            // Проверяем существование подкатегории
            // eslint-disable-next-line no-case-declarations
            const subcategoryExists = await shopPrisma.subcategories.findUnique({
              where: { id: subcategoryId }
            });
            
            if (!subcategoryExists) {
              return NextResponse.json(
                { error: 'Subcategory not found' },
                { status: 404 }
              );
            }
          
            // Преобразуем числовые значения
            // eslint-disable-next-line no-case-declarations
            const price = parseFloat(data.price);
            // eslint-disable-next-line no-case-declarations
            const stock = parseInt(data.stock, 10);
            
            if (isNaN(price)) {
              return NextResponse.json(
                { error: 'Invalid price format' },
                { status: 400 }
              );
            }
          
            if (isNaN(stock)) {
              return NextResponse.json(
                { error: 'Invalid stock format' },
                { status: 400 }
              );
            }
          
            // Создаем товар
            result = await shopPrisma.products.create({
              data: {
                name: data.name,
                price: price,
                stock: stock,
                subCategoryId: subcategoryId, // Используем правильное название поля из модели
                filePath: data.filePath || null,
                content: data.content || null,
                desrtiption: data.desrtiption || null,
                createdAt: new Date(thisYear, 6, 1).toISOString(),
                updatedAt: new Date(thisYear, 6, 1).toISOString()
  
              }
            });
            break;

      default:
        return NextResponse.json(
          { error: 'Invalid operation type' },
          { status: 400 }
        )
    }

    return NextResponse.json(result, { status: 201 })

  } catch (error) {
    console.error('Create Error:', error)
    return NextResponse.json(
      { 
        error: 'Creation failed',
        details: error.message,
        code: error.code
      },
      { status: 500 }
    )
  }
}