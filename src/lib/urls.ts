import type { Locale } from '../i18n';

const base = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;

export function withBase(path = '/') {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalizedPath}`;
}

export function localizedPath(path = '/', locale: Locale = 'en') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? normalized : `/zh-tw${normalized}`;
}

export function localizedHref(path = '/', locale: Locale = 'en') {
  return withBase(localizedPath(path, locale));
}
