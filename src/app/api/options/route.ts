import { NextResponse } from "next/server";
import { findOptions } from "@/services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const search = searchParams.get("search");

  const params: FindOptionsParams = {
    page: page ? +page : undefined,
    search: search || undefined,
  };

  const options = await findOptions.handle(params);

  return NextResponse.json(options);
}
