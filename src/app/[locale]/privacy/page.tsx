"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container-custom pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">
              Politica de Confidențialitate
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  1. Introducere
                </h2>
                <p className="text-foreground leading-relaxed">
                  Love Joy Happiness se angajează să protejeze
                  confidențialitatea vizitatorilor site-ului nostru. Această
                  politică explică cum colectăm, utilizăm și protejăm
                  informațiile dumneavoastră personale când folosiți site-ul
                  nostru și serviciile noastre.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  2. Informații pe care le colectăm
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  Colectăm următoarele tipuri de informații:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li>
                    Informații de contact: nume, adresa de email, numărul de
                    telefon
                  </li>
                  <li>
                    Informații de livrare: adresa de livrare, preferințele de
                    livrare
                  </li>
                  <li>
                    Informații despre comenzi: istoricul achizițiilor,
                    preferințele de produse
                  </li>
                  <li>
                    Informații tehnice: adresa IP, tipul de browser (colectate
                    automat de server)
                  </li>
                  <li>
                    Informații de plată: procesate securizat prin Stripe (nu
                    stocăm datele cardurilor)
                  </li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  3. Cum folosim informațiile
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  Folosim informațiile colectate pentru:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li>Procesarea și livrarea comenzilor dumneavoastră</li>
                  <li>
                    Comunicarea cu dumneavoastră despre comenzi și servicii
                  </li>
                  <li>Îmbunătățirea experienței pe site-ul nostru</li>
                  <li>
                    Trimiterea de actualizări despre produse noi (doar cu
                    acordul dumneavoastră)
                  </li>
                  <li>Respectarea obligațiilor legale și fiscale</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  4. Partajarea informațiilor
                </h2>
                <p className="text-foreground leading-relaxed">
                  Nu vindem, închiriem sau împărtășim informațiile dumneavoastră
                  personale cu terțe părți, cu excepția următoarelor situații:
                  servicii de livrare pentru expedierea comenzilor, procesatori
                  de plăți pentru tranzacții securizate, sau când este cerut de
                  lege.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  5. Securitatea datelor
                </h2>
                <p className="text-foreground leading-relaxed">
                  Implementăm măsuri de securitate tehnice și organizatorice
                  pentru a proteja informațiile dumneavoastră împotriva
                  accesului neautorizat, alterării, divulgării sau distrugerii.
                  Toate tranzacțiile sunt procesate prin Stripe cu criptare SSL.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  6. Stocarea datelor locale
                </h2>
                <p className="text-foreground leading-relaxed">
                  Site-ul nostru nu folosește cookie-uri. În schimb, folosim
                  localStorage pentru a stoca temporar produsele din coșul de
                  cumpărături pe dispozitivul dumneavoastră. Aceste informații
                  rămân doar pe calculatorul dumneavoastră și nu sunt trimise
                  către serverele noastre decât când plasați o comandă.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  7. Drepturile dumneavoastră
                </h2>
                <p className="text-foreground leading-relaxed mb-4">
                  Conform GDPR, aveți următoarele drepturi:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li>
                    Dreptul de acces la informațiile dumneavoastră personale
                  </li>
                  <li>Dreptul de rectificare a datelor incorecte</li>
                  <li>
                    Dreptul de ștergere a datelor (&ldquo;dreptul de a fi
                    uitat&rdquo;)
                  </li>
                  <li>Dreptul de restricționare a prelucrării</li>
                  <li>Dreptul la portabilitatea datelor</li>
                  <li>Dreptul de opoziție la prelucrare</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  8. Reținerea datelor
                </h2>
                <p className="text-foreground leading-relaxed">
                  Păstrăm informațiile dumneavoastră personale doar atât timp
                  cât este necesar pentru îndeplinirea scopurilor pentru care au
                  fost colectate, inclusiv pentru respectarea obligațiilor
                  legale, rezolvarea disputelor și aplicarea acordurilor
                  noastre.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  9. Modificări ale politicii
                </h2>
                <p className="text-foreground leading-relaxed">
                  Ne rezervăm dreptul de a actualiza această politică de
                  confidențialitate în orice moment. Modificările vor fi
                  publicate pe această pagină cu data actualizării. Utilizarea
                  continuă a site-ului după modificări constituie acceptarea
                  noii politici.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  10. Contact
                </h2>
                <p className="text-foreground leading-relaxed">
                  Pentru întrebări despre această politică de confidențialitate
                  sau despre modul în care gestionăm datele dumneavoastră, ne
                  puteți contacta prin:
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
