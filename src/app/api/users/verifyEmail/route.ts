import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

   
    const user = await User.findOne({
      VerifyToken: token,
      VerifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exist or token expired" },
        { status: 404 }
      );
    }

    console.log(user);

    user.isVerified = true;
    user.VerifyToken = undefined;
    user.VerifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
