"use client";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedProducts />

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

        {/* Newsletter Section */}
        <section className="py-16 bg-primary/10 dark:bg-primary/5">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Abonează-te la Newsletter
              </h2>
              <p className="text-foreground/70 mb-8">
                Abonează-te la newsletter-ul nostru pentru actualizări despre
                produse noi, oferte speciale și o doză regulată de fericire în
                inbox-ul tău.
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Adresa ta de email"
                  className="flex-grow px-4 py-3 rounded-md border border-gray-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary px-6 py-3 whitespace-nowrap"
                >
                  Abonează-te
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
