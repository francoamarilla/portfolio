/** URL usable como href: absoluta válida (https/mailto) o ruta local de /public. */
export const isValidHref = (url?: string): url is string =>
  !!url && (url.startsWith('/') || URL.canParse(url))
