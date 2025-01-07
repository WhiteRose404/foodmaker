import { NextResponse } from 'next/server'
import dbConnect from '@/utils/database'
import Restaurant from '@/models/restaurants';
import Item from '@/models/Item';

export async function POST(request: Request) {
    try {
      const { searchParams } = new URL(request.url)
      const restaurantName = searchParams.get('resto')
      const categoryName = searchParams.get('category')
   
      if (!restaurantName || !categoryName) {
        return NextResponse.json(
          { error: 'Restaurant and category names are required' },
          { status: 400 }
        )
      }
   
      const body = await request.json()
      const { 
        name,
        description,
        price,
        image,
        isCombo = false,
        comboItems = [],
        customization = [],
        order = 0
      } = body
   
      // Validate required fields
      if (!name || !price) {
        return NextResponse.json(
          { error: 'Item name and price are required' },
          { status: 400 }
        )
      }
   
      await dbConnect()
   
      // Find restaurant and category
      const restaurant = await Restaurant.findOne({ name: restaurantName })
      if (!restaurant) {
        return NextResponse.json(
          { error: 'Restaurant not found' },
          { status: 404 }
        )
      }
   
      const category = restaurant.categories.find(
        (cat: { name: string }) => cat.name.toLowerCase() === categoryName.toLowerCase()
      )
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        )
      }
   
      // Create new item
      const newItem = await Item.create({
        name,
        description,
        price,
        image,
        restaurantId: restaurant._id,
        isCombo,
        comboItems,
        customization,
        available: true
      })
   
      // Add item reference to category
      category.items.push({
        itemId: newItem._id,
        order
      })
   
      await restaurant.save()
   
      return NextResponse.json(newItem, { status: 201 })
    } catch (error) {
      console.error('Error adding item:', error)
      return NextResponse.json(
        { error: 'Failed to add item' },
        { status: 500 }
      )
    }
}