"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import axios from "axios";
import { X } from "lucide-react";
// import { set } from "mongoose";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

type IKUploadResponse = Awaited<ReturnType<typeof upload>>;

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadedType, setUploadedType] = useState<string | null>(null);

  const [fileId, setFileId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const validateFile = (file: File) => {
    if (fileType === "image" && !file.type.startsWith("image/")) {
      setError("Invalid image file");
      return false;
    }

    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Invalid video file");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File must be less than 10MB");
      return false;
    }

    return true;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    if (file.type.startsWith("video/")) {
      setUploadedType("video");
    } else if (file.type.startsWith("image/")) {
      setUploadedType("image");
    }

    setFileName(file.name);
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const { data: auth } = await axios.get("/api/auth/imageKit-auth");

      const res = await upload({
        file,
        fileName: file.name,
        token: auth.token,
        signature: auth.signature,
        expire: auth.expire,
        publicKey: auth.publicKey,

        onProgress: (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
            onProgress?.(percent);
          }
        },
      });

      toast.success("File uploaded successfully!");

      setVideoUrl(res.url as string);
      setThumbnailUrl(res.thumbnailUrl as string);
      setFileId(res.fileId as string);

      // setUploadedType(res.fileType as "image" | "video");
      // console.log(res);
      onSuccess(res);
      setUploaded(true);
    } catch (err) {
      if (err instanceof ImageKitUploadNetworkError) {
        setError("Network error during upload");
      } else if (err instanceof ImageKitInvalidRequestError) {
        setError("Invalid upload request");
      } else if (err instanceof ImageKitServerError) {
        setError("ImageKit server error");
      } else if (err instanceof ImageKitAbortError) {
        setError("Upload aborted");
      } else {
        setError("Upload failed");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.click();

    try {
      await axios.post("/api/video", {
        title,
        description,
        videoUrl,
        thumbnail: thumbnailUrl,
      });
      toast.success("Your content has been published !");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setUploaded(false);
      setFileName("");
      setProgress(0);
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Error uploading video");
    }
  };

  const handleResetFile = async () => {
    try {
      if (fileId) {
        await axios.delete("/api/file-delete", {
          data: { fileId },
        });
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Error deleting file");
    }

    toast.success("File deleted successfully!");

    setVideoUrl("");
    setThumbnailUrl("");
    setUploadedType(null);
    setUploaded(false);
    setFileName("");
    setProgress(0);
    setError(null);
    setFileId(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className="w-full max-w-xl mx-auto p-6 rounded-2xl shadow-lg border 
  bg-white dark:bg-neutral-900 dark:border-neutral-700"
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Upload {fileType}
      </h2>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Title */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter video title"
            className="mt-1 w-full p-3 rounded-lg border 
        bg-gray-50 dark:bg-neutral-800
        border-gray-300 dark:border-neutral-600
        focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Enter description..."
            className="mt-1 w-full p-3 rounded-lg border
        bg-gray-50 dark:bg-neutral-800
        border-gray-300 dark:border-neutral-600
        focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Upload Box */}
        <button
          type="button"
          disabled={uploading || uploaded}
          onClick={() => inputRef.current?.click()}
          className="w-full p-6 border-2 border-dashed rounded-xl
      hover:bg-gray-100 dark:hover:bg-neutral-800
      border-gray-300 dark:border-neutral-600
      text-gray-600 dark:text-gray-300
      transition disabled:opacity-50"
        >
          {uploading
            ? "Uploading..."
            : uploaded
              ? "Upload Completed"
              : "Click to upload Image or Video"}
        </button>
        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={handleFileUpload}
          disabled={uploaded}
          accept="image/*,video/*"
        />
        {/* Preview & Delete Button */}
        {videoUrl && (
          <div className="relative mt-4">
            <button
              onClick={handleResetFile}
              type="button"
              className="absolute -top-2 -right-2 z-10 bg-red-500 text-white p-1.5 
                 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Remove file"
            >
              <X />
            </button>

            {uploadedType === "video" ? (
              <video
                src={videoUrl}
                controls
                className="w-full h-64 rounded-lg object-cover"
              />
            ) : (
              <Image
                src={videoUrl}
                alt="Preview"
                width={500}
                height={300}
                className="w-full h-64 rounded-lg object-cover"
              />
            )}
          </div>
        )}
        {/* Selected File */}
        {fileName && (
          <div className="mt-4 flex items-center justify-between bg-gray-100 dark:bg-neutral-800 p-3 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              Selected: <span className="font-medium">{fileName}</span>
            </p>

            <button
              type="button"
              className="ml-4 text-sm text-red-500 hover:text-red-600 font-medium bg-gray-50 border border-red-500 dark:bg-gray-900/20 hover:dark:bg-gray-900/50 px-2 py-0.5 rounded-lg cursor-pointer"
              onClick={handleResetFile}
            >
              Cancel
            </button>
          </div>
        )}
        {/* Progress Bar */}
        {uploading && (
          <div className="mt-5">
            <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-3 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
              {progress}% uploaded
            </p>
          </div>
        )}
        {/* Error */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {/* Publish Button */}
        <button
          type="submit"
          disabled={!videoUrl || uploading}
          className="mt-6 w-full py-3 px-4 rounded-xl 
          bg-gradient-to-r from-blue-600 to-indigo-600 
          text-white font-semibold text-lg
          shadow-md hover:shadow-lg
          hover:from-blue-700 hover:to-indigo-700
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Publish Video
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
