import { describe, expect, it } from 'vitest';
import { pageUrlWithoutVideo, videoCodeFromUrl, videoShareUrl } from './incident-share';

describe('incident share links', () => {
  it('lit le code vidéo dans une URL complète', () => {
    expect(videoCodeFromUrl('https://example.test/BalanceTonFlic/?v=reddit-1xfbqdp')).toBe('reddit-1xfbqdp');
  });

  it('construit un lien partageable en conservant les autres paramètres', () => {
    expect(videoShareUrl('https://example.test/BalanceTonFlic/?lang=fr#observatoire', 'upload-20261024-nancy'))
      .toBe('https://example.test/BalanceTonFlic/?lang=fr&v=upload-20261024-nancy');
  });

  it('retire uniquement le code vidéo à la fermeture', () => {
    expect(pageUrlWithoutVideo('https://example.test/BalanceTonFlic/?lang=fr&v=reddit-1xfbqdp'))
      .toBe('https://example.test/BalanceTonFlic/?lang=fr');
  });
});
