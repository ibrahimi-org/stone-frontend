import { SignInAPI } from "@/lib/http/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cred = await req.json();
  // console.log("user login ....", cred, process.env.PARSE_ADDRESS);

  // const user = await SignInAPI(cred);
  // const sessionToken = user.getSessionToken();
  // console.log("user login", user);
  // return new NextResponse(JSON.stringify({ user, sessionToken }), {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   status: 200,
  // });
}
