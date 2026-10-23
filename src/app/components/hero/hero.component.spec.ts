import { describe, expect, it } from 'vitest';
import { Incident } from '../../models/incident';
import { latestIncident } from './hero.component';

function incident(id: string, date: string): Incident {
  return {
    id,
    date,
    title: id,
    description: '',
    city: 'Paris',
    country: 'France',
    category: 'Intervention',
    status: 'Source archivée',
    verified: false,
    demo: false,
    videoUrl: '',
    audioUrl: '',
    thumbnailUrl: '',
    sourceUrl: '',
    tags: []
  };
}

describe('latestIncident', () => {
  it('sélectionne la date de publication la plus récente', () => {
    const older = incident('older', 'Publié le 25 septembre 2026');
    const latest = incident('latest', 'Publié le 20 octobre 2026');
    const middle = incident('middle', 'Publié le 9 octobre 2026');

    expect(latestIncident([older, latest, middle])).toBe(latest);
  });

  it('renvoie null lorsque les archives sont vides', () => {
    expect(latestIncident([])).toBeNull();
  });
});
