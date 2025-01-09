import { NextRequest, NextResponse } from 'next/server'
import { Types } from "mongoose"
import dbConnect from '@/utils/database'
import Restaurant from '@/models/restaurants'

export async function PUT(request: NextRequest) {
 try {
   const { searchParams } = new URL(request.url)
   const restaurantId = searchParams.get('resto')
   if (!restaurantId) {
     return NextResponse.json(
       { error: 'Restaurant name is required' },
       { status: 400 }
     )
   }
   const body = await request.json();
   // Only allow updating top-level fields
   const allowedFields = ['name', 'logo', 'brandColor', 'phone', 'address', 'tables'];
   const updateData: Record<string, any> = {};
   allowedFields.forEach(field => {
     if (body[field] !== undefined) {
       updateData[field] = body[field]
     }
   })
   console.log("allow", body)
   // If no valid fields to update
   if (Object.keys(updateData).length === 0) {
     return NextResponse.json(
       { error: 'No valid fields to update' },
       { status: 400 }
     )
   }
   await dbConnect();
   const updatedRestaurant = await Restaurant.findOneAndUpdate(
     { _id: new Types.ObjectId(restaurantId) },
     { $set: updateData },
     { new: true, select: allowedFields.join(" ") } // return only updated fields
   )
   if (!updatedRestaurant) {
     return NextResponse.json(
       { error: 'Restaurant not found' },
       { status: 404 }
     )
   }
   return NextResponse.json(updatedRestaurant)
 } catch (error) {
   console.error('Error updating restaurant:', error)
   return NextResponse.json(
     { error: 'Failed to update restaurant' },
     { status: 500 }
   )
 }
}