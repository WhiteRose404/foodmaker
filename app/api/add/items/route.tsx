// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Item from '@/models/Item';
import Restaurant from '@/models/restaurants';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    // const session = await auth();
    // if (!session) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    // Connect to database
    await dbConnect();

    // Parse request body
    const body = await req.json();

    // Validate required fields
    const requiredFields = ['name', 'price', 'restaurantId', 'categoryName'];
    console.log("debuing:", body);
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate price
    if (typeof body.price !== 'number' || body.price < 0) {
      return NextResponse.json(
        { error: 'Price must be a non-negative number' },
        { status: 400 }
      );
    }

    // Validate arrays if provided
    if (body.sizes) {
      if (!Array.isArray(body.sizes) || 
          !body.sizes.every((size: any) => size.name && typeof size.price === 'number')) {
        return NextResponse.json(
          { error: 'Invalid sizes format' },
          { status: 400 }
        );
      }
    }

    if (body.addons) {
      if (!Array.isArray(body.addons) || 
          !body.addons.every((addon: any) => addon.name && typeof addon.price === 'number')) {
        return NextResponse.json(
          { error: 'Invalid addons format' },
          { status: 400 }
        );
      }
    }

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create new item
      const item = await Item.create([{
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
        restaurantId: body.restaurantId,
        sizes: body.sizes || [],
        addons: body.addons || [],
        available: body.available !== undefined ? body.available : true
      }], { session });

      // Find restaurant and category
      const restaurant = await Restaurant.findById(body.restaurantId);
      
      if (!restaurant) {
        await session.abortTransaction();
        return NextResponse.json(
          { error: 'Restaurant not found' },
          { status: 404 }
        );
      }

      // Find the category by name
      const categoryIndex = restaurant.categories.findIndex(
        (cat: any) => cat.name === body.categoryName
      );

      if (categoryIndex === -1) {
        await session.abortTransaction();
        return NextResponse.json(
          { error: 'Category not found in restaurant' },
          { status: 404 }
        );
      }

      // Get the current highest order in the category
      
      // restaurant.categories[categoryIndex].items.length > 0
      // ? Math.max(...restaurant.categories[categoryIndex].items.map((item: any) => item.order))
      // : -1;
      const highestOrder = 0


      // Add item to category
      restaurant.categories[categoryIndex].items.push({
        itemId: item[0]._id,
        order: highestOrder + 1
      });

      // Save restaurant changes
      await restaurant.save({ session });

      // Commit transaction
      await session.commitTransaction();

      // Return success response
      return NextResponse.json(
        { 
          message: 'Item created successfully and added to category',
          item: item[0],
          categoryOrder: highestOrder + 1
        },
        { status: 201 }
      );

    } catch (error) {
      // Rollback transaction on error
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  } catch (error: any) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}