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
                  Love Joy Happiness a început ca un mic proiect pasional în
                  2020, când fondatoarea noastră, Ana, a decis să transforme
                  pasiunea ei pentru design și artă într-o afacere care aduce
                  bucurie în casele oamenilor.
                </p>
                <p className="text-foreground/80 mb-4">
                  Ceea ce a început cu autocolante desenate manual pentru
                  prieteni și familie s-a transformat rapid într-o afacere în
                  creștere, oferind o gamă largă de produse decorative care
                  inspiră dragoste, bucurie și fericire.
                </p>
                <p className="text-foreground/80">
                  Astăzi, suntem o echipă mică dar dedicată, creând produse de
                  calitate cu grijă și atenție la detalii. Fiecare produs este
                  conceput pentru a aduce un zâmbet pe fețele clienților noștri
                  și pentru a adăuga o notă de culoare în viața lor de zi cu zi.
                </p>
              </div>
              <div className="relative h-80 md:h-auto rounded-lg overflow-hidden">
                <Image
                  src="/img/about/our-story.jpg"
                  alt="Povestea Love Joy Happiness"
                  fill
                  className="object-cover"
                />
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

            <div className="bg-gray-light dark:bg-gray-800 p-8 rounded-lg mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Echipa Noastră
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/img/team/team1.jpg"
                      alt="Ana - Fondator"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">Ana</h3>
                  <p className="text-foreground/70 text-sm">
                    Fondator & Designer
                  </p>
                </div>

                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/img/team/team2.jpg"
                      alt="Mihai - Marketing"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">Mihai</h3>
                  <p className="text-foreground/70 text-sm">Marketing</p>
                </div>

                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/img/team/team3.jpg"
                      alt="Elena - Designer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">Elena</h3>
                  <p className="text-foreground/70 text-sm">Designer Grafic</p>
                </div>

                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src="/img/team/team4.jpg"
                      alt="Andrei - Producție"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">Andrei</h3>
                  <p className="text-foreground/70 text-sm">
                    Manager Producție
                  </p>
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
