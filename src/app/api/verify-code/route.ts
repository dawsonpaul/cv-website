import { NextRequest, NextResponse } from "next/server";

// Get the secret code from environment variables
const SECRET_CODE = process.env.SECRET_CODE;

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    // Simple verification
    const isValid = code === SECRET_CODE;

    // Return result without exposing the actual code
    return NextResponse.json({
      success: isValid,
    });
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
