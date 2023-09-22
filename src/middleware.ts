import { NextRequest, NextResponse } from "next/server";
import { upload } from '@/app/api/update-file/multer'


export async function middleware(request: NextRequest) {
  // const multer = upload.single('file');
  // await runMiddleware(request, NextResponse, multer)
  //console.log('passou')
  return NextResponse.next();
}

export const config = {
  // matcher: '/api/update-file',
}
