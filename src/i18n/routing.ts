import {
    DEFAULT_LOCALE,
    LOCALE_TO_REGION_PREFIX_MAP,
    SUPPORTED_LOCALES
} from '@/lib';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: {
    mode: 'always',
    prefixes: LOCALE_TO_REGION_PREFIX_MAP
  }
});