'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';

const flags = [
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
] as const;

export default function LanguageToggle({ onDark = false }: { onDark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (code: 'ro' | 'en') => {
    if (code === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
  };

  return (
    <div className={`flex items-center gap-0.5 rounded-full p-1 ${onDark ? 'bg-background/10' : 'bg-sand'}`}>
      {flags.map(({ code, label, flag }) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            disabled={isPending || active}
            aria-label={`Switch language to ${label}`}
            aria-pressed={active}
            className={`grid size-9 place-items-center rounded-full text-lg leading-none transition-all duration-200 ${
              active
                ? onDark ? 'bg-background/20' : 'bg-surface shadow-soft'
                : 'cursor-pointer opacity-55 grayscale-40 hover:opacity-100 hover:grayscale-0'
            } disabled:cursor-default`}
          >
            <span aria-hidden>{flag}</span>
          </button>
        );
      })}
    </div>
  );
}
