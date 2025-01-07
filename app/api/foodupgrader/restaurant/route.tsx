import { NextResponse } from 'next/server'
import dbConnect from '@/utils/database'
import Restaurant from '@/models/restaurants';

export async function POST(request: Request) {
    try {
      await dbConnect()
      const data = await request.json();
      console.log("creating Restaurant: with the following data", data);
      // validate data
      const newItem = await Restaurant.create(data);
      return NextResponse.json(newItem, { status: 201 })
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to create Restaurant' },
        { status: 500 }
      )
    }
  }