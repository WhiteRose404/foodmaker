// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Item from '@/models/Item';
import Restaurant from '@/models/restaurants';
import mongoose from 'mongoose';


export async function PATCH(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const body = await req.json();

    const { searchParams } = new URL(req.url)
    const restaurantId = searchParams.get('item') || "" // is actually itemId

    // Validate item id
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return NextResponse.json(
        { error: 'Invalid item ID' },
        { status: 400 }
      );
    }

    // Get the existing item
    const existingItem = await Item.findById(restaurantId);
    if (!existingItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Create update object with only provided fields
    const updateFields: any = {};

    // Handle basic fields
    if (body.name !== undefined || body.name != "") updateFields.name = body.name;
    if (body.description !== undefined || body.description != "") updateFields.description = body.description;
    if (body.image !== undefined || body.image != "") updateFields.image = body.image;
    if (body.available !== undefined || body.available != "") updateFields.available = body.available;

    // Handle price with validation
    if (body.price !== undefined) {
      if (typeof body.price !== 'number' || body.price < 0) {
        return NextResponse.json(
          { error: 'Price must be a non-negative number' },
          { status: 400 }
        );
      }
      updateFields.price = body.price;
    }

    // Handle sizes array
    if (body.sizes !== undefined || body.sizes.length !== 0) {
      if (!Array.isArray(body.sizes) || 
          !body.sizes.every((size :any) => size.name && typeof size.price === 'number')) {
        return NextResponse.json(
          { error: 'Invalid sizes format' },
          { status: 400 }
        );
      }
      updateFields.sizes = body.sizes;
    }

    // Handle addons array
    if (body.addons !== undefined || body.addons.length !== 0) {
      if (!Array.isArray(body.addons) || 
          !body.addons.every((addon: any) => addon.name && typeof addon.price === 'number')) {
        return NextResponse.json(
          { error: 'Invalid addons format' },
          { status: 400 }
        );
      }
      updateFields.addons = body.addons;
    }

    // Handle category change if provided
    if (body.newCategoryName !== undefined || body.newCategoryName != "") {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        // Find restaurant
        const restaurant = await Restaurant.findById(existingItem.restaurantId);
        if (!restaurant) {
          throw new Error('Restaurant not found');
        }

        // Find old and new categories
        const oldCategoryIndex = restaurant.categories.findIndex(
          (cat: any) => cat.items.some((item: any) => item.itemId.toString() === restaurantId)
        );

        const newCategoryIndex = restaurant.categories.findIndex(
          (cat: any) => cat.name === body.newCategoryName
        );

        if (newCategoryIndex === -1) {
          throw new Error('New category not found');
        }

        // Remove item from old category if found
        if (oldCategoryIndex !== -1) {
          restaurant.categories[oldCategoryIndex].items = 
            restaurant.categories[oldCategoryIndex].items.filter(
              (item: any) => item.itemId.toString() !== restaurantId
            );
        }

        // Add item to new category
        // const highestOrder = restaurant.categories[newCategoryIndex].items.length > 0
        //   ? Math.max(...restaurant.categories[newCategoryIndex].items.map((item: any) => item.order))
        //   : -1;
        const highestOrder = 0

        restaurant.categories[newCategoryIndex].items.push({
          itemId: restaurantId,
          order: highestOrder + 1
        });

        await restaurant.save({ session });
        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    }

    // Update the item
    const updatedItem = await Item.findByIdAndUpdate(
      restaurantId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      message: 'Item updated successfully',
      item: updatedItem
    });

  } catch (error: any) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}