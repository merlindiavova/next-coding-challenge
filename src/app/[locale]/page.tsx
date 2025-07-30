import { setRequestLocale } from 'next-intl/server';
import { fetchProducts } from '@/lib';
import { Locale } from 'next-intl';
import styles from '@/app/[locale]/page.module.css'
import ProductGrid from '@/component/ProductGrid';
import ExtendedProductGrid from '@/component/ExtendedProductGrid';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  
  setRequestLocale(locale);
  
  const initialProducts = await fetchProducts(locale);

  return (
    <div className={styles.grid}>
      <ProductGrid initialProducts={initialProducts} locale={ locale } />
      <ExtendedProductGrid locale={locale} />
    </div>
  );
}