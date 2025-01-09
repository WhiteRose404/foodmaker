import { put, del, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
 try {
   const { searchParams } = new URL(request.url);
   const fileName = searchParams.get('file');
   const urlencoding = encodeURIComponent(fileName || "");
   const update = searchParams.get('update');
   if(!urlencoding || !fileName) {
    return NextResponse.json(
      { error: 'No Name provided' },
      { status: 400 }
    );
   }
   const formData = await request.formData();
   const file = formData.get(urlencoding) as File;
   console.log(formData);
   if (!file) {
     return NextResponse.json(
       { error: 'No file provided' },
       { status: 400 }
     );
   }
   if(update === "true"){
    const listResult = await list({
      prefix: fileName,
      limit: 1,
    })
    if(listResult.blobs.length === 0){
      console.log("The file doesn't exsists");
    }else{
      const deletedBlob = await del(listResult.blobs[0].url)
      console.log("The file deleted successfully", deletedBlob);
    }
   }
   const blob = await put(fileName, file, {
     access: 'public',
     addRandomSuffix: true 
   });
   return NextResponse.json({ url: blob.url });
 } catch (error) {
    console.log("what just happedn",error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
 }
}