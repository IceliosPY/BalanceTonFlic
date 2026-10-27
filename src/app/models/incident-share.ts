export function videoCodeFromUrl(value: string): string | null {
  const url = new URL(value);
  const queryCode = url.searchParams.get('v')?.trim();
  if (queryCode) return queryCode;

  const pathCode = url.pathname.match(/\/v\/([^/]+)\/?$/)?.[1];
  return pathCode ? decodeURIComponent(pathCode) : null;
}

export function videoShareUrl(value: string, code: string): string {
  const url = new URL(value);
  const rootPath = url.pathname.match(/^(.*\/)v\/[^/]+\/?$/)?.[1] ?? ensureTrailingSlash(url.pathname);
  url.pathname = `${rootPath}v/${encodeURIComponent(code)}/`;
  url.search = '';
  url.hash = '';
  return url.toString();
}

export function pageUrlWithoutVideo(value: string): string {
  const url = new URL(value);
  const rootPath = url.pathname.match(/^(.*\/)v\/[^/]+\/?$/)?.[1];
  if (rootPath) url.pathname = rootPath;
  url.searchParams.delete('v');
  url.hash = '';
  return url.toString();
}

function ensureTrailingSlash(value: string): string {
  return value.endsWith('/') ? value : `${value}/`;
}
