import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export const GET = (req: Request) => {
  // Stripeの処理を書く
  return NextResponse.json<ResponseData>({ message: "Hello, world!" });
};
