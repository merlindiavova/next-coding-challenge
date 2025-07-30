'use client';
import { DEFAULT_LOCALE, getCurrencyFromLocale } from '@/lib';
import { useFormatter, type Locale } from 'next-intl';
import { getLocale } from 'next-intl/server';

interface CurrencyProps {
  value: number;
  locale?: Locale;
}

export default function Currency({ value, locale }: CurrencyProps) {
  const thisLocale = locale || DEFAULT_LOCALE;
  const currency = getCurrencyFromLocale(thisLocale);

  return (
    <>{Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value)}</>
  );
}