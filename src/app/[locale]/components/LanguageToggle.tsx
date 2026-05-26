'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const other = locale === 'ro' ? 'en' : 'ro';
  const label = other.toUpperCase();

  const onClick = () => {
    startTransition(() => {
      router.replace(pathname, { locale: other });
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      aria-label={`Switch language to ${label}`}
      className="px-2 py-1 text-sm font-semibold text-gray-700 hover:text-[#b200ff] transition-colors disabled:opacity-50 dark:text-gray-200 dark:hover:text-[#b200ff]"
    >
      {label}
    </button>
  );
}
