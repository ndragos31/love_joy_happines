"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-[#ff6b6b]/5 blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-[#4ecdc4]/5 blur-3xl"></div>
      <div className="absolute top-40 left-1/4 w-24 h-24 rounded-full bg-[#ffdd67]/5 blur-xl"></div>

      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <h1 className="font-bold text-foreground">
              <span className="text-5xl md:text-6xl lg:text-7xl text-[#ff6b6b]">
                Love
              </span>
              <span className="text-5xl md:text-6xl lg:text-7xl">,</span>{" "}
              <span className="text-5xl md:text-6xl lg:text-7xl text-[#4ecdc4]">
                Joy
              </span>{" "}
              <span className="text-5xl md:text-6xl lg:text-7xl">&</span>
              <br />
              <span className="text-5xl md:text-6xl lg:text-7xl text-[#ffdd67]">
                Happiness
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-4">
              Autocolante frumoase, bannere și produse care răspândesc
              <br />
              dragoste și fericire
            </p>

            <div className="flex flex-row space-x-4 pt-6">
              <Link href="/products">
                <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-medium rounded-md px-8 py-3 text-lg transition-colors">
                  Cumpără Acum
                </button>
              </Link>

              <Link href="/about">
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-200 font-medium rounded-md px-8 py-3 text-lg transition-colors">
                  Explorează Colecția
                </button>
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 z-10 pointer-events-none"></div>

            <div className="absolute top-4 right-4 w-12 h-12 rounded-full border-4 border-white/20 z-10"></div>
            <div className="absolute bottom-6 left-6 w-8 h-8 rounded-full bg-[#4ecdc4]/20 z-10"></div>

            <Image
              src="/images/hero-image.jpg"
              alt="Autocolante și bannere colorate"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
