/* eslint-disable @next/next/no-img-element */
"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      {/* 1. Header with Theme Toggle */}
      <Header />
      {/* 2. Hero Section (Text Texture focus) */}
      <main className="container mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
          Transform Your <br /> Viewing Experience
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          DotStreaming turns chaotic content discovery into a seamless,
          high-fidelity visual journey.
        </p>

        {/* 3. Bento Grid (Feature Section like the image) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden max-w-5xl mx-auto mb-24">
          <FeatureCard
            title="Crystal Clear 4K"
            desc="Experience movies as they were meant to be seen."
          />
          <FeatureCard
            title="Instant Play"
            desc="Zero lag, zero buffering. Just pure entertainment."
          />
          <FeatureCard
            title="Curated Lists"
            desc="Our AI understands your mood better than you do."
          />
          <FeatureCard
            title="Social Watch"
            desc="Invite friends and react in real-time."
          />
          <FeatureCard
            title="Offline Mode"
            desc="Download and take your stories anywhere."
          />
          <FeatureCard
            title="Safe for Kids"
            desc="Advanced parental controls for peace of mind."
          />
        </div>

        {/* {check out our dashboard page for more features} */}
        <section className="py-10 border-t border-zinc-100 dark:border-zinc-900">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            Check out our dashboard page for more features
          </h2>
          <Link
            href="/dashboard"
            className="flex items-center justify-center"
          >
            <button className="flex items-center gap-3 bg-white text-black border border-zinc-300 px-8 py-3 rounded-full font-medium hover:bg-zinc-50 transition-all shadow-sm cursor-pointer">
              /Dashboard page
            </button>
          </Link>
        </section>

        {/* 4. Bottom CTA (The Sign-In section from the image) */}
        <section className="py-20 border-t border-zinc-100 dark:border-zinc-900">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Ready to start streaming?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <button className="flex items-center gap-3 bg-white text-black border border-zinc-300 px-8 py-3 rounded-full font-medium hover:bg-zinc-50 transition-all shadow-sm cursor-pointer">
                <img
                  src="https://www.google.com/favicon.ico"
                  className="w-4 h-4"
                  alt="google"
                />
                Sign in with Google
              </button>
            </Link>
            <Link
              href="/signup"
              className="text-zinc-500  hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Sign up to new account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Helper Component for the Bento Grid
function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 border-[0.5px] border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors text-left">
      <h3 className="font-bold text-sm mb-2 uppercase tracking-widest text-blue-600">
        Feature
      </h3>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-snug">
        {desc}
      </p>
    </div>
  );
}
