// app/api/restaurants/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/utils/database'
import Restaurant from '@/models/restaurants'
import Item from '@/models/Item';
import mongoose from 'mongoose';

// Delete Restaurant Endpoint
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    // const session = await auth();
    // if (!session) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    await dbConnect();
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('resto') || ""
    // Validate restaurant ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid restaurant ID' },
        { status: 400 }
      );
    }

    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find restaurant
      const restaurant = await Restaurant.findById(id);
      if (!restaurant) {
        return NextResponse.json(
          { error: 'Restaurant not found' },
          { status: 404 }
        );
      }

      // Get all item IDs from all categories
      const itemIds = restaurant.categories.flatMap(
        (category: any) => category.items.map((item: any) => item.itemId)
      );

      // Delete all associated items
      await Item.deleteMany(
        { _id: { $in: itemIds } },
        { session }
      );

      // Delete the restaurant
      await Restaurant.findByIdAndDelete(id, { session });

      await session.commitTransaction();

      return NextResponse.json({
        message: 'Restaurant and associated items deleted successfully'
      });

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  } catch (error: any) {
    console.error('Error deleting restaurant:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}