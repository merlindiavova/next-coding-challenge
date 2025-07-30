'use client';

import { fetchExtendedProducts, Product } from '@/lib';
import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';

export default function ExtendedProductGrid({ locale }: { locale: string }) {
    const [extendedProducts, setExtendedProducts] = useState<Product[]>([]);

    useEffect(() => {
    const fetchMore = async () => {
      const products = await fetchExtendedProducts(locale);
      setExtendedProducts(products);
    };
    fetchMore();
  }, [locale]);

    return <ProductGrid initialProducts={extendedProducts} />;
}