import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/utils/database'
import Restaurant from '@/models/restaurants'
import Item from '@/models/Item';
import mongoose from 'mongoose';

export async function DELETE(
    req: NextRequest,
  ) {
    console.log("but why")
    try {
    //   const session = await auth();
    //   if (!session) {
    //     return NextResponse.json(
    //       { error: 'Unauthorized' },
    //       { status: 401 }
    //     );
    //   }
        console.log("hello")
  
      await dbConnect();
      const { searchParams } = new URL(req.url)
      const restaurantId = searchParams.get('resto') || ""
      const categoryName = searchParams.get('categoryId') // Get category ID
      console.log("okay", restaurantId)

      if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return NextResponse.json(
          { error: 'Invalid restaurant ID' },
          { status: 400 }
        );
      }

  
      const dbSession = await mongoose.startSession();
      dbSession.startTransaction();
  
      try {
        // Find restaurant
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
          return NextResponse.json(
            { error: 'Restaurant not found' },
            { status: 404 }
          );
        }
  
        // Find category
        const categoryIndex = restaurant.categories.findIndex(
          (cat: any) => cat.name === categoryName
        );
  
        if (categoryIndex === -1) {
          return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
          );
        }
  
        // Get item IDs from the category
        const itemIds = restaurant.categories[categoryIndex].items.map(
          (item: any) => item.itemId
        );
  
        // Delete all items in the category
        await Item.deleteMany(
          { _id: { $in: itemIds } },
          { session: dbSession }
        );
  
        // Remove category from restaurant
        restaurant.categories.splice(categoryIndex, 1);
        await restaurant.save({ session: dbSession });
  
        await dbSession.commitTransaction();
  
        return NextResponse.json({
          message: 'Category and associated items deleted successfully'
        });
  
      } catch (error) {
        await dbSession.abortTransaction();
        throw error;
      } finally {
        dbSession.endSession();
      }
  
    } catch (error: any) {
      console.error('Error deleting category:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
  