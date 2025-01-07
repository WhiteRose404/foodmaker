import { NextResponse } from 'next/server'
import dbConnect from '@/utils/database'
import Restaurant from '@/models/restaurants';

export async function POST(request: Request) {
    try {
      const { searchParams } = new URL(request.url)
      const restaurantName = searchParams.get('resto')
  
      if (!restaurantName) {
        return NextResponse.json(
          { error: 'Restaurant name is required' },
          { status: 400 }
        )
      }
  
      const body = await request.json()
      const { name, description, order = 0 } = body
  
      // Validate required fields
      if (!name) {
        return NextResponse.json(
          { error: 'Category name is required' },
          { status: 400 }
        )
      }
  
      await dbConnect()
  
      // Check if restaurant exists
      const restaurant = await Restaurant.findOne({ name: restaurantName })
      if (!restaurant) {
        return NextResponse.json(
          { error: 'Restaurant not found' },
          { status: 404 }
        )
      }
  
      // Check if category already exists
      const categoryExists = restaurant.categories.some(
        (category: { name: string }) => category.name.toLowerCase() === name.toLowerCase()
      )
      if (categoryExists) {
        return NextResponse.json(
          { error: 'Category already exists' },
          { status: 400 }
        )
      }
  
      // Add new category
      const newCategory = {
        name,
        description,
        order,
        items: [],
        active: true
      }
  
      restaurant.categories.push(newCategory)
      await restaurant.save()
      return NextResponse.json(newCategory, { status: 201 })
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to add category' },
        { status: 500 }
      )
    }
  }