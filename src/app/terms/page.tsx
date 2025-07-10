"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container-custom pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">
              Termeni și Condiții
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  1. Acceptarea termenilor
                </h2>
                <p className="text-foreground leading-relaxed">
                  Prin accesarea și utilizarea site-ului Love Joy Happiness,
                  acceptați să respectați și să fiți obligați de acești termeni
                  și condiții de utilizare. Dacă nu sunteți de acord cu oricare
                  dintre acești termeni, vă rugăm să nu utilizați site-ul
                  nostru.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  2. Despre serviciile noastre
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  Love Joy Happiness oferă servicii de vânzare online de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li>Autocolante personalizate și standard</li>
                  <li>Bannere publicitare și decorative</li>
                  <li>Etichete pentru diverse utilizări</li>
                  <li>Flyere și materiale promoționale</li>
                  <li>Alte produse de imprimare și personalizare</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  3. Conturi de utilizator
                </h2>
                <p className="text-foreground leading-relaxed">
                  Pentru a plasa comenzi, este posibil să fie necesar să creați
                  un cont. Sunteți responsabili pentru menținerea
                  confidențialității contului și parolei dumneavoastră și pentru
                  restricționarea accesului la computerul dumneavoastră.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  4. Comenzi și plăți
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      4.1 Plasarea comenzilor
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      Toate comenzile sunt supuse disponibilității produselor.
                      Ne rezervăm dreptul de a refuza sau anula orice comandă
                      din motive rezonabile.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      4.2 Prețuri
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      Prețurile afișate pe site includ TVA și sunt în lei
                      românești (RON). Ne rezervăm dreptul de a modifica
                      prețurile fără notificare prealabilă.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      4.3 Plăți
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      Acceptăm plăți prin card bancar, procesate securizat prin
                      Stripe. Plata trebuie efectuată în totalitate înainte de
                      procesarea comenzii.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  5. Livrare și expediere
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      5.1 Termene de livrare
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      Termenele de livrare estimate sunt furnizate la momentul
                      comenzii și pot varia în funcție de complexitatea
                      produsului și destinația de livrare.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      5.2 Costuri de livrare
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      Costurile de livrare sunt calculate în funcție de
                      dimensiunea, greutatea și destinația comenzii și vor fi
                      afișate înainte de finalizarea comenzii.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      5.3 Responsabilitatea pentru livrare
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      Riscul de pierdere și titlul pentru articolele
                      achiziționate trec la cumpărător la momentul livrării
                      către compania de curierat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  6. Returnări și rambursări
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      6.1 Produse personalizate
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      Produsele personalizate nu pot fi returnate decât în cazul
                      unor defecte de fabricație sau erori din partea noastră.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      6.2 Produse standard
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      Produsele standard pot fi returnate în termen de 14 zile
                      de la livrare, în stare originală și nefolosite.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      6.3 Procesul de returnare
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      Pentru a iniția o returnare, contactați-ne prin email sau
                      pagina de contact. Costurile de returnare sunt suportate
                      de către client, cu excepția cazurilor în care produsul
                      este defect.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  7. Proprietate intelectuală
                </h2>
                <p className="text-foreground leading-relaxed">
                  Toate conținuturile site-ului, inclusiv texte, grafice,
                  logo-uri, imagini și software-ul, sunt proprietatea Love Joy
                  Happiness și sunt protejate de legile drepturilor de autor.
                  Pentru produse personalizate, clientul garantează că deține
                  drepturile asupra designului furnizat.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  8. Limitarea răspunderii
                </h2>
                <p className="text-foreground leading-relaxed">
                  Love Joy Happiness nu va fi răspunzătoare pentru daune
                  indirecte, incidentale sau consecutive rezultate din
                  utilizarea produselor noastre. Răspunderea noastră totală nu
                  va depăși valoarea produsului achiziționat.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  9. Modificări ale termenilor
                </h2>
                <p className="text-foreground leading-relaxed">
                  Ne rezervăm dreptul de a modifica acești termeni și condiții
                  în orice moment. Modificările vor intra în vigoare imediat
                  după publicarea pe site. Utilizarea continuă a site-ului
                  constituie acceptarea modificărilor.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  10. Legea aplicabilă
                </h2>
                <p className="text-foreground leading-relaxed">
                  Acești termeni și condiții sunt guvernați de legile României.
                  Orice dispute vor fi rezolvate de instanțele competente din
                  România.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  11. Contact
                </h2>
                <p className="text-foreground leading-relaxed">
                  Pentru întrebări despre acești termeni și condiții, ne puteți
                  contacta prin:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground mt-4">
                  <li>Email: lovejoyhappinesscontact@yahoo.com</li>
                  <li>
                    Prin pagina de{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      contact
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center mt-8 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-foreground">
                  Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
