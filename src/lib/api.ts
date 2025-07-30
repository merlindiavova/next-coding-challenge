import {
  apiProductsResponseSchema,
  mapApiProduct,
  Product,
} from '@/lib';

export async function fetchProducts(locale: string): Promise<Product[]> {
    try {
        const url = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;
        if (!url) {
            throw new Error('Missing Product API information');
        }

        const response = await fetch(url, { cache: 'force-cache' });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const validResponse = apiProductsResponseSchema.parse(data);

        if (!validResponse.success) {
            throw new Error('API response is not successful');
        }

        if (!validResponse.products) {
            throw new Error('API response malformed');
        }

        return validResponse.products.map(
            (product) => mapApiProduct(product, locale)
        );
    } catch (error) {
        console.error('[fetchProducts] Error:', error);
        return [];
    }
}

// not cached
export async function fetchExtendedProducts(
    locale: string
): Promise<Product[]> {
    try {
        const url = process.env.NEXT_PUBLIC_EXTENDED_PRODUCTS_API_URL;
        if (!url) {
            throw new Error('Missing Extended Product API information');
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const validResponse = apiProductsResponseSchema.parse(data);

        if (!validResponse.success) {
            throw new Error('API response is not successful');
        }

        if (!validResponse.recommendations) {
            throw new Error('API response malformed');
        }

        return validResponse.recommendations.map(
            (product) => mapApiProduct(product, locale)
        );
    } catch (error) {
        console.error('[fetchExtendedProducts] Error:', error);
        return [];
    }
}