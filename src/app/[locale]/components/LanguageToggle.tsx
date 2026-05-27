'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';

const flags = [
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
] as const;

export default function LanguageToggle() {
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
    <div className="flex items-center gap-1">
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
            className={`text-xl leading-none p-1 rounded transition-all ${
              active
                ? 'opacity-100 ring-2 ring-[#b200ff]'
                : 'opacity-50 hover:opacity-100 cursor-pointer'
            } disabled:cursor-default`}
          >
            <span aria-hidden>{flag}</span>
          </button>
        );
      })}
    </div>
  );
}
