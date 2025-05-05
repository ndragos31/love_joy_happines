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
                    <span className="text-primary font-bold">AP</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Ana Popescu</h4>
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
                  &ldquo;Autocolantele personalizate pentru laptopul meu sunt
                  fantastice! Culorile sunt vibrante, iar calitatea este mult
                  peste așteptări. Chiar după luni de utilizare, nu s-au
                  deteriorat deloc. Le recomand tuturor prietenilor mei!&rdquo;
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                    <span className="text-secondary font-bold">MI</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mihai Ionescu</h4>
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
                  &ldquo;Am comandat etichete personalizate pentru evenimentul
                  firmei noastre și rezultatul a fost impecabil. Designul
                  elegant și detaliile fine au impresionat pe toată lumea.
                  Livrarea a fost rapidă și serviciul clienți excelent. Vom
                  reveni cu siguranță!&rdquo;
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-light dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                    <span className="text-accent dark:text-yellow-400 font-bold">
                      EC
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Elena Cojocaru</h4>
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
                  &ldquo;Bannerul aniversar pentru petrecerea fiicei mele a fost
                  minunat! Toată lumea a făcut poze cu el. Calitatea printului a
                  fost excepțională, iar materialul foarte rezistent. Apreciez
                  foarte mult atenția la detalii și promptitudinea cu care a
                  fost livrat.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
