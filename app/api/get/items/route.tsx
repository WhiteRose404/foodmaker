// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/database';
import Item from '@/models/Item';
import Restaurant from '@/models/restaurants';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Get URL parameters
    const searchParams = req.nextUrl.searchParams;
    const restaurantId = searchParams.get('restaurantId');
    const categoryName = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('order') || 'desc';

    // Base query
    let query: any = {};
    let items;
    let totalItems = 0;

    // If restaurantId is provided
    if (restaurantId) {
      if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return NextResponse.json(
          { error: 'Invalid restaurant ID' },
          { status: 400 }
        );
      }
      query.restaurantId = restaurantId;
    }

    // If both restaurantId and category are provided
    if (restaurantId && categoryName) {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return NextResponse.json(
          { error: 'Restaurant not found' },
          { status: 404 }
        );
      }

      // Find the category
      const category = restaurant.categories.find((cat: any) => cat.name === categoryName);
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }

      // Get item IDs from the category
      const itemIds = category.items.map((item: any) => item.itemId);
      query._id = { $in: itemIds };

      // Sort by category order if available
      if (sortBy === 'categoryOrder') {
        const itemOrders = new Map(
          category.items.map((item: any) => [item.itemId.toString(), item.order])
        );

        // Fetch items
        items = await Item.find(query);
        
        // Sort items based on category order
        // items.sort((a, b) => {
        //   const orderA = itemOrders.get(a._id.toString()) || 0;
        //   const orderB = itemOrders.get(b._id.toString()) || 0;
        //   return sortOrder === 'desc' ? orderB - orderA : orderA - orderB;
        // });

        // Handle pagination manually
        // totalItems = items.length;
        // items = items.slice((page - 1) * limit, page * limit);
      }
    }

    // If items haven't been fetched yet (no category ordering needed)
    if (!items) {
      // Build sort object
    //   const sortObject: any = {};
    //   sortObject[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Get total count for pagination
    //   totalItems = await Item.countDocuments(query);

      // Fetch items with pagination
      items = await Item.find(query)
        // .sort(sortObject)
        // .skip((page - 1) * limit)
        // .limit(limit)
        .lean();
    }

    // Calculate pagination info
    // const totalPages = Math.ceil(totalItems / limit);
    // const hasNextPage = page < totalPages;
    // const hasPrevPage = page > 1;

    // return NextResponse.json({
    //   items,
    //   pagination: {
    //     currentPage: page,
    //     totalPages,
    //     totalItems,
    //     hasNextPage,
    //     hasPrevPage,
    //     limit
    //   }
    // });
    return NextResponse.json({
        items,
    });

  } catch (error: any) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}