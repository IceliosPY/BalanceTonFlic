import { describe, expect, it } from 'vitest';
import { pageUrlWithoutVideo, videoCodeFromUrl, videoShareUrl } from './incident-share';

describe('incident share links', () => {
  it('lit le code vidéo dans une URL complète', () => {
    expect(videoCodeFromUrl('https://example.test/BalanceTonFlic/?v=reddit-1xfbqdp')).toBe('reddit-1xfbqdp');
  });

  it('lit également le code dans une page de partage', () => {
    expect(videoCodeFromUrl('https://example.test/BalanceTonFlic/v/upload-20261024-nancy/'))
      .toBe('upload-20261024-nancy');
  });

  it('construit une page de partage dédiée', () => {
    expect(videoShareUrl('https://example.test/BalanceTonFlic/?lang=fr#observatoire', 'upload-20261024-nancy'))
      .toBe('https://example.test/BalanceTonFlic/v/upload-20261024-nancy/');
  });

  it('normalise aussi un ancien lien de partage à paramètres', () => {
    expect(videoShareUrl('https://example.test/BalanceTonFlic/?v=reddit-1xfbqdp', 'reddit-1xfbqdp'))
      .toBe('https://example.test/BalanceTonFlic/v/reddit-1xfbqdp/');
  });

  it('retire uniquement le code vidéo à la fermeture', () => {
    expect(pageUrlWithoutVideo('https://example.test/BalanceTonFlic/?lang=fr&v=reddit-1xfbqdp'))
      .toBe('https://example.test/BalanceTonFlic/?lang=fr');
  });

  it('revient à la racine depuis une page de partage', () => {
    expect(pageUrlWithoutVideo('https://example.test/BalanceTonFlic/v/reddit-1xfbqdp/'))
      .toBe('https://example.test/BalanceTonFlic/');
  });
});
