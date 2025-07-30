import { z } from 'zod';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE, DEFAULT_REGION } from './const';
import { getCurrencyFromLocale, getLocaleFromRegion, getSupportedRegions } from './locale';

export const apiProductSchema = z.object({
	id: z.number().int().positive(),
	name: z.record(z.string(), z.string().min(1)).refine((val) =>
		Object.keys(val).length > 0, {
			message: 'Name must have at least one locale entry',
		}),
	price: z.record(z.string(), z.number().nonnegative()).refine((val) =>
		Object.keys(val).length > 0, {
			message: 'Price must have at least one currency entry',
		}),
	stock: z.number().int().nonnegative(),
});
export type ApiProduct = z.infer<typeof apiProductSchema>;

export const apiProductsResponseSchema = z.object({
  success: z.boolean(),
  products: z.array(apiProductSchema),
});
export type ApiProductsResponse = z.infer<typeof apiProductsResponseSchema>;

export const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    stock: z.number().int().nonnegative(),
});
export type Product = z.infer<typeof productSchema>;

export function mapApiProduct(
	apiProduct: ApiProduct,
	region?: string | null | undefined
): Product {
    const validApiProduct = apiProductSchema.parse(apiProduct);

    const supportedRegions = getSupportedRegions();
    const currentRegion = region && supportedRegions.includes(region) 
        ? region 
        : DEFAULT_REGION;

    const locale = getLocaleFromRegion(currentRegion);
    const currency = getCurrencyFromLocale(locale);

    const name = validApiProduct.name[currentRegion] || '';
    const price = validApiProduct.price[currency] ?? 0;

    const product = {
		id: validApiProduct.id,
		name,
		price,
		stock: validApiProduct.stock,
	};

    return productSchema.parse(product);
}