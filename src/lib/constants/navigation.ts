import { NavItem } from "../types/navigation";

export const navItems: NavItem[] = [
  {
    title: "Acasă",
    href: "/",
    description: "Pagina principală",
  },
  {
    title: "Produse",
    href: "/products",
    description: "Toate produsele noastre",
  },
  {
    title: "Despre Noi",
    href: "/about",
    description: "Despre Love Joy Happiness",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Contactează-ne",
  },
];

export const userNavItems: NavItem[] = [
  {
    title: "Coș",
    href: "/cart",
    description: "Vezi coșul tău de cumpărături",
  },
  {
    title: "Cont",
    href: "/account",
    description: "Administrează contul tău",
  },
];
