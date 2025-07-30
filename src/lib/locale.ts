import {
  LOCALE_TO_REGION_MAP,
  REGION_TO_LOCALE_MAP,
  LOCALE_TO_CURRENCY_MAP,
  REGION_TO_CURRENCY_MAP,
  SUPPORTED_LOCALES,
  SUPPORTED_REGIONS,
  DEFAULT_LOCALE,
  DEFAULT_REGION,
  DEFAULT_CURRENCY
} from './const';

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export type SupportedRegion = typeof SUPPORTED_REGIONS[number];
export type SupportedCurrency = 'gbp' | 'usd';

export function getRegionFromLocale(locale: string): SupportedRegion {
  return LOCALE_TO_REGION_MAP[locale as keyof typeof LOCALE_TO_REGION_MAP] 
    || DEFAULT_REGION;
}

export function getLocaleFromRegion(region: string): SupportedLocale {
  return REGION_TO_LOCALE_MAP[region as keyof typeof REGION_TO_LOCALE_MAP] 
    || DEFAULT_LOCALE;
}

export function getCurrencyFromLocale(locale: string): SupportedCurrency {
  return LOCALE_TO_CURRENCY_MAP[locale as keyof typeof LOCALE_TO_CURRENCY_MAP] 
    || DEFAULT_CURRENCY;
}

export function getCurrencyFromRegion(region: string): SupportedCurrency {
  return REGION_TO_CURRENCY_MAP[region as keyof typeof REGION_TO_CURRENCY_MAP] 
    || DEFAULT_CURRENCY;
}

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function isSupportedRegion(region: string): region is SupportedRegion {
  return SUPPORTED_REGIONS.includes(region as SupportedRegion);
}

export function getSupportedLocales(): readonly SupportedLocale[] {
  return SUPPORTED_LOCALES;
}

export function getSupportedRegions(): readonly SupportedRegion[] {
  return SUPPORTED_REGIONS;
}