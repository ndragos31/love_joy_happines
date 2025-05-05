"use client";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Categories />

        {/* Decorative Divider Above Testimonials */}
        <div className="py-10 bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="flex items-center justify-center">
              <div className="w-1/4 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent"></div>
              <div className="mx-4">
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
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div className="w-1/4 h-px bg-gradient-to-r from-secondary/60 via-secondary/60 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ce Spun Clienții Noștri
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Nu ne crede doar pe cuvânt - ascultă de la clienții noștri
                fericiți care au experimentat bucuria produselor noastre.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Jane Doe</h4>
                    <div className="flex text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80 italic">
                  &ldquo;Îmi plac foarte mult autocolantele pe care le-am
                  comandat! Sunt vibrante, durabile și aduc multă bucurie
                  laptopului și sticlei mele de apă. Cu siguranță voi comanda
                  mai multe!&rdquo;
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                    <span className="text-secondary font-bold">MS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mike Smith</h4>
                    <div className="flex text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80 italic">
                  &ldquo;Bannerul personalizat pe care l-am comandat pentru ziua
                  fiicei mele a fost perfect! Calitate excelentă, culori
                  vibrante și a sosit mai devreme decât mă așteptam. Recomand cu
                  încredere!&rdquo;
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                    <span className="text-accent dark:text-yellow-400 font-bold">
                      AJ
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Alex Johnson</h4>
                    <div className="flex text-yellow-400">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80 italic">
                  &ldquo;Am cumpărat cana de cafea &lsquo;Bucurie&rsquo; și mă
                  face să zâmbesc în fiecare dimineață. Calitatea este
                  excelentă, iar designul este chiar mai vibrant în realitate. O
                  iubesc!&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="py-16 bg-primary/10 dark:bg-primary/5">
          <div className="container-custom">
            <div className="flex items-center justify-center">
              <div className="w-1/4 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
              <div className="mx-4">
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
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <div className="w-1/4 h-px bg-gradient-to-r from-primary/60 via-primary/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
