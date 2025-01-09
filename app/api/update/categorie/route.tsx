import { NextResponse } from 'next/server'
import dbConnect from '@/utils/database'
import Restaurant from '@/models/restaurants'
import { Types } from 'mongoose'

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get('resto')
    const categoryId = searchParams.get('categoryId') // Get category ID

    if (!restaurantId || !categoryId) {
      return NextResponse.json(
        { error: 'Restaurant ID and category ID are required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { name, description, logo, order, active } = body

    // Validate at least one field to update
    if (!name && !description && !logo && order === undefined && active === undefined) {
      return NextResponse.json(
        { error: 'At least one field to update is required' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Find restaurant
    const restaurant = await Restaurant.findById({ _id: new Types.ObjectId(restaurantId) })
    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }

    // Find category by ID
    const categoryIndex = restaurant.categories.findIndex(
      (category: any) => category._id.toString() === categoryId
    )

    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // If changing name, check if new name already exists in other categories
    if (name) {
      const nameExists = restaurant.categories.some(
        (category: { name: string }, i: number) => 
          i !== categoryIndex && 
          category.name.toLowerCase() === name.toLowerCase()
      )
      if (nameExists) {
        return NextResponse.json(
          { error: 'Category with new name already exists' },
          { status: 400 }
        )
      }
    }

    // Update category
    const updatedCategory = {
      ...restaurant.categories[categoryIndex].toObject(),
      name: name || restaurant.categories[categoryIndex].name,
      description: description || restaurant.categories[categoryIndex].description,
      logo: logo || restaurant.categories[categoryIndex].logo,
      order: order ?? restaurant.categories[categoryIndex].order,
      active: active ?? restaurant.categories[categoryIndex].active
    }

    restaurant.categories[categoryIndex] = updatedCategory
    await restaurant.save()

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error("Update category error:", error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}