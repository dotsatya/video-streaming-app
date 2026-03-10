import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

    if (!privateKey || !publicKey) {
      throw new Error("ImageKit keys are missing in env");
    }

    const authParams = getUploadAuthParams({
      privateKey,
      publicKey,
    });

    return Response.json({
      ...authParams,
      publicKey,
    });
  } catch (error) {
    console.error("ImageKit auth error:", error);

    return Response.json(
      { error: "ImageKit authentication failed" },
      { status: 500 },
    );
  }
}
