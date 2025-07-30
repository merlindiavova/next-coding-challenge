'use client';

import { useBasketStore } from '@/store/basketStore';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from '@/app/[locale]/page.module.css';

export default function BasketInfo() {
  const t = useTranslations('Home');
  const totalItems = useBasketStore((state) => state.totalItems());

  return (
    <Link href="/checkout" className={styles.basket}>
      {t('basket', { count: totalItems })}
    </Link>
  );
}
