import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/utils/database'
import Restaurant from '@/models/restaurants'

export async function GET(request: NextRequest) {
 try {
   const { searchParams } = new URL(request.url)
   const restaurantId = searchParams.get('resto')
   if (!restaurantId) {
     return NextResponse.json(
       { error: 'Restaurant name is required' },
       { status: 400 }
     )
   }
   await dbConnect()
   const restaurant = await Restaurant.findById(restaurantId)
   if (!restaurant) {
     return NextResponse.json(
       { error: 'Restaurant not found' },
       { status: 404 }
     )
   }

   // Transform the data to nest items directly in categories
   const transformedRestaurant = {
     ...restaurant.toObject()
   }
   console.log(transformedRestaurant)
   return NextResponse.json(transformedRestaurant)
 } catch (error) {
   console.error('Error fetching restaurant:', error)
   return NextResponse.json(
     { error: 'Failed to fetch restaurant details' },
     { status: 500 }
   )
 }
}