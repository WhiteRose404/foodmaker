import { NextResponse } from 'next/server';
import dbConnect from "@/utils/database";
import Restaurant from '@/models/restaurants';

export async function GET() {
    try {
      await dbConnect();
      // Example model usage
      console.log("fetching restaurents");
      const restaurants = await Restaurant.find({}, 'name brandColor logo active')
      console.log("REQUESTED: items",restaurants)
      return NextResponse.json(restaurants)
    } catch (error) {
      return NextResponse.json(JSON.stringify(
          { error: 'Failed to fetch restaurents' },
        ), { status: 500 }
      );
    }
  }
  