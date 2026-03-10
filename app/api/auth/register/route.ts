import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    if (!email || !password ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },  
      );
    }
    await dbConnect();
    console.log("Database connected successfully in register route");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { message: "User already exists" },
        { status: 401 },
      );
    }
    const user = await User.create({ name, email, password });
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 },
    );
  } catch (error) {
    console.log("Registration error", error);
    return NextResponse.json(
      { error: "filled to create user" },
      { status: 500 },
    );
  }
}
