import { NextResponse } from 'next/server';
import dbConnect from "@/utils/database";
import Restaurant from '@/models/restaurants';

export async function GET() {
    try {
      await dbConnect();
      // Example model usage
      console.log("fetching restaurents");
      const items = await Restaurant.find({})
      return NextResponse.json(items)
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to fetch restaurents' },
        { status: 500 }
      )
    }
  }
  