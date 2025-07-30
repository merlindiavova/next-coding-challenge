import z from 'zod';
import { mapApiProduct } from './schema';
import { DEFAULT_CURRENCY, DEFAULT_REGION } from './const';

const validApiProduct = {
	id: 1,
	name: {
		us: 'Wireless Headphones',
		uk: 'Wireless Headsets'
	},
	price: {
		usd: 99.99,
		gbp: 76.99
	},
	stock: 45,
};

const invalidApiProduct = {
	id: 'should-fail',
	name: {
		us: 'Wireless Headphones',
		uk: 'Wireless Headsets'
	},
	price: {
		usd: -99.99,
		gbp: 76.99
	},
	stock: -9,
};

describe('Product schema validation', () => {
    test('maps a valid API product', () => {
        const product = mapApiProduct(validApiProduct);

        expect(product).toEqual({
			id: validApiProduct.id,
			name: validApiProduct.name.uk,
			price: validApiProduct.price.gbp,
			stock: validApiProduct.stock,
		});
    });

    test('throws on an invalid API product', () => {
        expect(() => mapApiProduct(invalidApiProduct as any))
			.toThrow(z.ZodError);
    });

    test('falls back to default region for unsupported regions', () => {
        const result = mapApiProduct(validApiProduct, 'cd');

        expect(result).toEqual({
            id: validApiProduct.id,
            name: validApiProduct.name[DEFAULT_REGION],
            price: validApiProduct.price[DEFAULT_CURRENCY],
            stock: validApiProduct.stock,
        });
    });
});