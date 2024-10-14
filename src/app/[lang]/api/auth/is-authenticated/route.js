import ParseNode from "@/configs/http";
import { isAuthenticated } from "@/lib/http/auth";
import { NextResponse } from "next/server";

export function GET(req) {
  console.log("---- inside server", ParseNode.User.current());
  // return new NextResponse(
  //   JSON.stringify({
  //     loggedIn: isAuthenticated(),
  //   }),
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     status: 200,
  //   }
  // );
}
