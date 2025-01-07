import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "@/utils/database";
import Restaurant from '@/models/restaurants';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const restaurantName = searchParams.get('resto')

    if (!restaurantName) {
      return NextResponse.json(
        { error: 'Restaurant name is required' },
        { status: 400 }
      )
    }
    await dbConnect()
    
    // Find restaurant and only select the categories field
    const restaurant = await Restaurant.findOne(
      { name: restaurantName },
      'categories'
    )

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(restaurant.categories)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch restaurant categories' },
      { status: 500 }
    )
  }
}