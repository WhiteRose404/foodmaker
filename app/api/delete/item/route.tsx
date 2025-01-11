import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/utils/database'
import Restaurant from '@/models/restaurants'
import Item from '@/models/Item';
import mongoose from 'mongoose';


export async function DELETE(
    req: NextRequest,
  ) {
    try {
    //   const session = await auth();
    //   if (!session) {
    //     return NextResponse.json(
    //       { error: 'Unauthorized' },
    //       { status: 401 }
    //     );
    //   }
  
      await dbConnect();
      const { searchParams } = new URL(req.url)
      const id = searchParams.get('item') || "" 
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: 'Invalid item ID' },
          { status: 400 }
        );
      }
  
      const dbSession = await mongoose.startSession();
      dbSession.startTransaction();
  
      try {
        // Find item
        const item = await Item.findById(id);
        if (!item) {
          return NextResponse.json(
            { error: 'Item not found' },
            { status: 404 }
          );
        }
  
        // Find and update restaurant to remove item reference
        const restaurant = await Restaurant.findById(item.restaurantId);
        if (restaurant) {
          // Remove item from any category that contains it
          restaurant.categories.forEach((category: any) => {
            category.items = category.items.filter(
              (catItem: any) => catItem.itemId.toString() !== id
            );
          });
          await restaurant.save({ session: dbSession });
        }
  
        // Delete the item
        await Item.findByIdAndDelete(id, { session: dbSession });
  
        await dbSession.commitTransaction();
  
        return NextResponse.json({
          message: 'Item deleted successfully'
        });
  
      } catch (error) {
        await dbSession.abortTransaction();
        throw error;
      } finally {
        dbSession.endSession();
      }
  
    } catch (error: any) {
      console.error('Error deleting item:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }