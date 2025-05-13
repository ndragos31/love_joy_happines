"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-8">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Despre Noi</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  Povestea Noastră
                </h2>
                <p className="text-foreground/80 mb-4">
                  Love Joy Happiness a luat naștere în 2025 din dorința de a
                  aduce culoare și personalitate în viața oamenilor prin creații
                  unice și personalizate. Totul a început cu o imprimantă și o
                  idee simplă: să transformăm viziunea clienților în realitate.
                </p>
                <p className="text-foreground/80 mb-4">
                  De la flyere care captează atenția, la autocolante creative și
                  etichete elegante pentru uleiuri esențiale, am crescut
                  constant pentru a oferi soluții complete de personalizare.
                  Fiecare proiect este o nouă oportunitate de a aduce bucurie și
                  de a da viață ideilor clienților noștri.
                </p>
                <p className="text-foreground/80">
                  În prezent, ne mândrim cu un atelier modern dotat cu
                  echipamente de ultimă generație, care ne permite să oferim
                  produse de înaltă calitate. Fie că este vorba despre flyere
                  pentru evenimente speciale, autocolante personalizate sau
                  etichete pentru branduri de uleiuri esențiale, punem pasiune
                  și atenție la detalii în fiecare proiect.
                </p>
              </div>
              <div className="relative h-80 md:h-auto rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10"></div>
                <Image
                  src="/img/about/print-shop.jpg"
                  alt="Atelier modern de printare Love Joy Happiness"
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-sm">
                    Atelierul nostru modern de printare și personalizare
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
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
                <h3 className="text-xl font-semibold mb-2">Misiunea Noastră</h3>
                <p className="text-foreground/80">
                  Să aducem dragoste, bucurie și fericire în casele oamenilor
                  prin produse creative și de calitate.
                </p>
              </div>

              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Valorile Noastre</h3>
                <p className="text-foreground/80">
                  Calitate, creativitate, sustenabilitate și satisfacția
                  clienților sunt în centrul a tot ceea ce facem.
                </p>
              </div>

              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-accent dark:text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Viziunea Noastră</h3>
                <p className="text-foreground/80">
                  Să devenim sursa preferată pentru produse decorative care
                  inspiră și aduc bucurie în viața de zi cu zi.
                </p>
              </div>
            </div>

            {/* Title with decorative elements */}
            <div className="text-center mb-12 relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-16 h-16 bg-secondary/5 rounded-full blur-lg"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-20 h-20 bg-accent/5 rounded-full blur-xl"></div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground relative">
                De ce să alegi{" "}
                <span className="text-primary">Love Joy Happiness</span>
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="bg-gray-light dark:bg-gray-800 p-8 rounded-lg mb-16 relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
                <div className="flex items-start space-x-4 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">
                      Calitate Premium
                    </h3>
                    <p className="text-foreground/70">
                      Folosim materiale de cea mai bună calitate și tehnologii
                      moderne pentru a crea produse care rezistă în timp.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">
                      Livrare Rapidă
                    </h3>
                    <p className="text-foreground/70">
                      Procesăm și expediem comenzile în cel mai scurt timp
                      posibil pentru ca tu să te bucuri rapid de produsele tale.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
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
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">
                      Satisfacție Garantată
                    </h3>
                    <p className="text-foreground/70">
                      Suntem dedicați satisfacției clienților noștri și oferim
                      suport complet pentru orice nelămurire sau problemă.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm transition-transform hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
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
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">
                      Prețuri Competitive
                    </h3>
                    <p className="text-foreground/70">
                      Oferim cel mai bun raport calitate-preț pentru produsele
                      noastre, cu reduceri frecvente și promoții speciale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
