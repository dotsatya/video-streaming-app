"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Video {
  _id: string;
  title?: string;
  description?: string;
  videoUrl?: string;
  thumbnail?: string;
  controls?: boolean;
  transformations?: {
    hight: number;
    width: number;
    quality?: number;
  };
}

export default function VideosList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/video");
        // console.log(response);

        if (response.data.videos) {
          setVideos(response.data.videos);
        } else {
          setVideos([]); 
        }
      } catch (err) {
        console.error("Failed to fetch videos:", err);
        
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || "A server error occurred.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-muted-foreground">
        Loading videos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
        {error}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground border rounded-lg bg-muted/20">
        No videos found. Upload one to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div key={video._id} className="border rounded-xl overflow-hidden bg-card text-card-foreground shadow-sm">
        <div className="aspect-video bg-black w-full relative">
      <video
        src={video.videoUrl}
        controls
        preload="metadata"
        poster={video.thumbnail} 
        className="w-full h-full object-contain"
      >
        Your browser does not support the video tag.
      </video>
    </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-lg truncate mb-1">
              {video.title || "Untitled Video"}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {video.description || "No description provided."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}