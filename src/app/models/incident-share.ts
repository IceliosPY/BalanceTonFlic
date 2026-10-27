export function videoCodeFromUrl(value: string): string | null {
  const code = new URL(value).searchParams.get('v')?.trim();
  return code || null;
}

export function videoShareUrl(value: string, code: string): string {
  const url = new URL(value);
  url.searchParams.set('v', code);
  url.hash = '';
  return url.toString();
}

export function pageUrlWithoutVideo(value: string): string {
  const url = new URL(value);
  url.searchParams.delete('v');
  url.hash = '';
  return url.toString();
}
