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
import { Link } from '@/i18n/navigation'
const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: ReactNode;
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata(props: Omit<Props, 'children'>): Promise<Metadata> {
  const {locale} = await props.params;

  const t = await getTranslations({locale, namespace: 'Home'});

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
            <div id={styles.scrollFix}><div id={styles.fauxBody}>
              <header className={styles.header}>
                <h1>
                  <Link href='/'>
                    {"Michael's Amazing Web Store"}
                  </Link>
                </h1>
                <BasketInfo />
              </header>
              <main className={styles.main}>
                {children}
              </main>
            </div></div>
          </NextIntlClientProvider>
        </body>
    </html>
  )
}
