"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, User as UserIcon, Mail, Fingerprint } from "lucide-react"; // Optional: install lucide-react for icons

export default function UserInfo() {
  const { data: session, status } = useSession();

  // 1. Professional Loading State (Skeleton-like)
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 2. Unauthenticated State
  if (!session) {
    return (
      <div className="p-6 text-center bg-gray-900 border border-gray-800 rounded-xl shadow-xl">
        <p className="text-gray-400">No active session found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl">
      {/* Top Profile Header */}
      <div className="relative h-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute -bottom-10 left-6">
          <div className="relative h-20 w-20 rounded-full border-4 border-gray-900 overflow-hidden bg-gray-800">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <UserIcon size={32} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-12 pb-6 px-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              {session.user?.name || "Anonymous User"}
            </h2>
            <p className="text-sm text-blue-400 font-medium">
              Verified Account
            </p>
          </div>

          <hr className="border-gray-800" />

          {/* Details List */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <Mail size={18} className="text-gray-500" />
              <span className="text-sm truncate">{session.user?.email}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <Fingerprint size={18} className="text-gray-500" />
              <span className="text-xs font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded">
                ID: {session.user?.id}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4">
            <button
              onClick={() => signOut()}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600/10 border border-red-600/20 rounded-lg hover:bg-red-600 hover:text-white"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
