"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { useSession, signOut } from "next-auth/react";
import { LogOut, Mail, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserInfo() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
          <p className="text-sm text-muted-foreground">Fetching user info...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const name = session.user?.name || "Anonymous";
  const avatarFallback = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {" "}
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#account-details">
                  Account details
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      
      <div
        id="account-details"
        className="w-[98%] mx-auto rounded-2xl overflow-hidden bg-card border border-border shadow-md"
      >
        {/* Top Banner - Using a subtle gradient for depth */}
        <div className="h-32 w-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"></div>

        {/* Profile Section */}
        <div className="relative flex items-start gap-8 px-10 pb-8 -mt-10">
          {/* Avatar - Slightly larger with a thick border to pop */}
          <Avatar className="h-32 w-32 border-[6px] border-background shadow-xl shrink-0">
            <AvatarImage
              src={session.user?.image || ""}
              alt={name}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl font-bold bg-muted">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          {/* User Info Container - Aligned to the top to match Avatar top */}
          <div className="flex flex-col gap-4 mt-12 w-full">
            {/* Row 1: Name and Edit Button */}
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                {name}
              </h2>
              <button className="flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all shadow-sm">
                <Pencil size={14} />
                Edit Profile
              </button>
            </div>

            {/* Row 2: Email and Sign Out aligned horizontally */}
            <div className="flex items-center gap-3">
              {/* Email Badge */}
              <div className="flex items-center gap-2.5 text-sm font-medium px-4 py-2 rounded-xl bg-secondary/50 border border-border text-muted-foreground shadow-sm">
                <Mail size={16} className="text-primary" />
                <span>{session.user?.email}</span>
              </div>

              {/* Sign Out Button - Outlined style to keep hierarchy clean */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2.5 px-5 py-2 text-sm font-semibold rounded-xl bg-foreground text-background hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-black/5"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
