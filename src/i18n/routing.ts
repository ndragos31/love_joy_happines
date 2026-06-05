import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ro', 'en'],
  defaultLocale: 'ro',
  localePrefix: 'as-needed',
  // Always load Romanian by default. Ignore Accept-Language header and any
  // prior cookie, and never write a locale cookie. English only via /en URL.
  localeDetection: false,
  localeCookie: false
});
