import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
 try {
   const { searchParams } = new URL(request.url)
   const fileName = searchParams.get('fileName')
   if(!fileName) {
    return NextResponse.json(
      { error: 'No Name provided' },
      { status: 400 }
    );
   }
   const formData = await request.formData();
   const file = formData.get(fileName) as File;
   if (!file) {
     return NextResponse.json(
       { error: 'No file provided' },
       { status: 400 }
     );
   }
   const blob = await put(fileName, file, {
     access: 'public',
     addRandomSuffix: true 
   });
   return NextResponse.json({ url: blob.url });
 } catch (error) {
   return NextResponse.json(
     { error: 'Upload failed' },
     { status: 500 }
   );
 }
}