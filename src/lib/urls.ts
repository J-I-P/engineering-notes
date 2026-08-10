const base = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;

export function withBase(path = '/') {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalizedPath}`;
}
