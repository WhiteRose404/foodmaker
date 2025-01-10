import { NextResponse } from 'next/server'
import dbConnect from '@/utils/database'
import Restaurant from '@/models/restaurants';
import { Types } from 'mongoose';

export async function POST(request: Request) {
  console.log("hi")
    try {
      const { searchParams } = new URL(request.url)
      const restaurantId = searchParams.get('resto')
  
      if (!restaurantId) {
        return NextResponse.json(
          { error: 'Restaurant name is required' },
          { status: 400 }
        )
      }
  
      const body = await request.json()
      const { name, description, logo, order = 0 } = body
  
      // Validate required fields
      if (!name) {
        return NextResponse.json(
          { error: 'Category name is required' },
          { status: 400 }
        )
      }
  
      await dbConnect()
  
      // Check if restaurant exists
      const restaurant = await Restaurant.findById({ _id: new Types.ObjectId(restaurantId) })
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
        logo,
        items: [],
        active: true
      }
      console.log("hi5")
  
      restaurant.categories.push(newCategory)
      await restaurant.save()
      return NextResponse.json(newCategory, { status: 201 })
    } catch (error) {
      console.log("what happend 001", error);
      return NextResponse.json(
        { error: 'Failed to add category' },
        { status: 500 }
      )
    }
  }