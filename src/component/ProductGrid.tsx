'use client';

import { useBasketStore } from '@/store/basketStore';
import styles from '@/app/[locale]/page.module.css';
import { Product } from '@/lib';
import { useFormatter, useTranslations } from 'next-intl';
import Currency from './Currency';

type Props = {
    locale: string;
    initialProducts: Product[];
};

export default function ProductGrid({ initialProducts, locale }: Props) {
    const t = useTranslations('Home');
    const addToBasket = useBasketStore((state) => state.addToBasket);

    const renderProduct = (product: Product) => (
        <div key={product.id} className={styles.card}>
            <h2>{product.name}</h2>
            <p><Currency value={product.price} locale={locale} /></p>
            <button onClick={() => addToBasket(product)} aria-label={t('addToBasket')}>
                {t('addToBasket')}
            </button>
        </div>
    );

    return <>{initialProducts.map(renderProduct)}</>;
}