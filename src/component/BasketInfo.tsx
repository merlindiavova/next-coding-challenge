'use client';

import { useBasketStore } from '@/store/basketStore';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from '@/app/[locale]/page.module.css';
import { useEffect, useState } from 'react';

export default function BasketInfo() {
  const t = useTranslations('Home');
  const totalItems = useBasketStore((state) => state.totalItems());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayItems = isClient ? totalItems : 0;

  return (
    <Link href="/checkout" className={styles.basket}>
      {t('basket', { count: displayItems })}
    </Link>
  );
}
