'use client';

import { useBasketStore } from '@/store/basketStore';
import { useFormatter, useTranslations } from 'next-intl';
import styles from './Checkout.module.css';
import Currency from './Currency';

type Props = {
    locale: string;
};

export default function Checkout({ locale }: Props) {
    const t = useTranslations('CheckoutPage');
    const format = useFormatter();
    const items = useBasketStore((state) => state.items);
    const totalItems = useBasketStore((state) => state.totalItems());
    const totalPrice = useBasketStore((state) => state.totalPrice());
    const emptyBasket = useBasketStore((state) => state.emptyBasket);
    const removeFromBasket = useBasketStore((state) => state.removeFromBasket);

    if (items.length === 0) {
        return (
            <section className={styles.section}>
                <h2>{t('title')}</h2>
                <p>{t('emptyBasket')}</p>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <h2>{t('title')}</h2>

            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <caption>{t('totalItems', { count: totalItems })}</caption>
                    <thead>
                        <tr>
                            <th scope='col'>{t('productColumn')}</th>
                            <th scope='col'>{t('quantityColumn')}</th>
                            <th scope='col'>{t('priceColumn')}</th>
                            <th scope='col'>{t('totalColumn')}</th>
                            <th scope='col'>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <th scope='row'>{item.name}</th>
                                <td>{item.quantity}</td>
                                <td>
                                    <Currency value={item.price} locale={locale} />
                                </td>
                                <td>
                                    <Currency value={item.price * item.quantity} locale={locale} />
                                </td>
                                <td>
                                    <button onClick={() => removeFromBasket(item.id)}>{t('removeFromBasket')}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th scope='row' colSpan={4}>Grand Total</th>
                            <td><Currency value={totalPrice} locale={locale} /></td>
                        </tr>
                        <tr>
                            <th scope='row' colSpan={5}>
                                <button onClick={emptyBasket}>{t('emptyBasket')}</button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    );
}