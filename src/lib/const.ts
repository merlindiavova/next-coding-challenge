// this file can be optimised but keeping verbose for clarity.

export const SUPPORTED_LOCALES = ['en-GB', 'en'];
export const SUPPORTED_REGIONS = ['uk', 'us'];

export const LOCALE_TO_REGION_MAP = {
  'en-GB': 'uk',
  'en': 'us'
} as const;

export const REGION_TO_LOCALE_MAP = {
  'uk': 'en-GB',
  'us': 'en'
} as const;

export const LOCALE_TO_CURRENCY_MAP = {
  'en-GB': 'gbp',
  'en': 'usd'
} as const;

export const REGION_TO_CURRENCY_MAP = {
  'uk': 'gbp',
  'us': 'usd'
} as const;

export const DEFAULT_LOCALE = 'en-GB';
export const DEFAULT_REGION = 'uk';
export const DEFAULT_CURRENCY = 'gbp';
