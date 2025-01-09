// app/api/restaurants/[restaurantId]/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Restaurant from '@/models/restaurants';
import Item from '@/models/Item';
import { isValidObjectId } from 'mongoose';

export async function GET(
  request: NextRequest,
) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get('resto')
    const categoryId = searchParams.get('categoryId')

    if (!isValidObjectId(restaurantId)) {
      return NextResponse.json(
        { error: 'Invalid restaurant ID' },
        { status: 400 }
      )
    }

    // Base query for items from this restaurant
    const baseQuery = { 
      restaurantId,
      available: true
    }

    // If category is specified, first get the item IDs from that category
    if (categoryId) {
      const restaurant = await Restaurant.findOne(
        { 
          _id: restaurantId,
          'categories._id': categoryId 
        },
        { 'categories.$': 1 }
      )

      if (!restaurant || !restaurant.categories[0]) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        )
      }

      const categoryItemIds = restaurant.categories[0].items.map((item: any) => item.itemId)
      const items = await Item.find({ 
        ...baseQuery,
        _id: { $in: categoryItemIds }
      })

      return NextResponse.json(items)
    }

    // If no category specified, get all restaurant items
    const items = await Item.find(baseQuery);
    console.log("ITEMS Requested", items);
    return NextResponse.json(items);

  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}