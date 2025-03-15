import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative bg-gray-light dark:bg-gray-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b6b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              <span className="text-primary">Love</span>,{" "}
              <span className="text-secondary">Joy</span> &{" "}
              <span className="text-accent dark:text-yellow-400">
                Happiness
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/80">
              Brighten your day with our colorful collection of stickers,
              banners, and merchandise that spread love, joy, and happiness.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link href="/products">
                <button className="btn btn-primary px-8 py-3 text-lg">
                  Shop Now
                </button>
              </Link>

              <Link href="/about">
                <button className="btn btn-outline px-8 py-3 text-lg">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-foreground/70">
                Trusted by 1000+ happy customers
              </span>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10 rounded-lg"></div>
            <Image
              src="/images/hero-image.jpg"
              alt="Colorful stickers and banners"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />

            {/* Floating product badges */}
            <div className="absolute top-6 right-6 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-20 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Stickers</p>
                <p className="text-sm text-foreground/70">50+ designs</p>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-20 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Banners</p>
                <p className="text-sm text-foreground/70">Custom designs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
