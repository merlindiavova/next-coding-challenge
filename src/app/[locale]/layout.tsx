import '@/app/globals.css'
import BasketInfo from '@/component/BasketInfo'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import styles from '@/app/[locale]/page.module.css';
const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: ReactNode;
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata(props: Omit<Props, 'children'>): Promise<Metadata> {
  const {locale} = await props.params;

  const t = await getTranslations({locale, namespace: 'LocaleLayout'});

  return {
    title: t('title')
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({ children, params }: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextIntlClientProvider>
          <BasketInfo />
          <main className={styles.main}>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
