import { setRequestLocale } from 'next-intl/server';
import { fetchProducts } from '@/lib';
import { Locale } from 'next-intl';
import ProductHomePage from './productHomePage';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  
  setRequestLocale(locale);
  
  const products = await fetchProducts(locale);

  return <ProductHomePage products={products} locale={locale} />;
}