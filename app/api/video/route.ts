import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/db";
import { IVideo, Video, VIDEO_DIMENSIONS } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    if (!videos || videos.length === 0) {
      return NextResponse.json({ message: "No videos found" }, { status: 200 });
    }
    return NextResponse.json({ videos }, { status: 200 });
  } catch (error) {
    console.log("Error fetching videos", error);
    return NextResponse.json(
      { error: "Error fetching videos" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const body: IVideo = await request.json();
    if (!body.title || !body.description || !body.videoUrl || !body.thumbnail) {
      return NextResponse.json(
        { error: "Missing fields are required" },
        { status: 400 },
      );
    }
    const videoData = {
      ...body,
      controls: body?.controls ?? true,
      transformations: body?.transformations ?? {
        hight: VIDEO_DIMENSIONS.height,
        width: VIDEO_DIMENSIONS.width,
        quality: body?.transformations?.quality ?? 100,
      },
    };
    const newVideo = await Video.create(videoData);
    return NextResponse.json(newVideo);
  } catch (error) {
    console.log("Error creating video", error);
    return NextResponse.json(
      { error: "Error creating video" },
      { status: 500 },
    );
  }
}
