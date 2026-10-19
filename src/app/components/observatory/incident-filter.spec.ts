import { describe, expect, it } from 'vitest';
import { Incident } from '../../models/incident';
import { filterIncidents } from './incident-filter';

const incidents: readonly Incident[] = [
  {
    id: 'one', title: 'Manifestation à Paris', description: 'Description', date: '2026-01-01', city: 'Paris',
    country: 'France', category: 'Manifestation', status: 'Vérifié', verified: true, demo: false,
    videoUrl: '', audioUrl: '', thumbnailUrl: '', sourceUrl: '', tags: ['témoignage']
  },
  {
    id: 'two', title: 'Contrôle public', description: 'Description', date: '2026-01-02', city: 'Bruxelles',
    country: 'Belgique', category: 'Contrôle', status: 'À confirmer', verified: false, demo: false,
    videoUrl: '', audioUrl: '', thumbnailUrl: '', sourceUrl: '', tags: ['source']
  }
];

describe('filterIncidents', () => {
  it('filtre par territoire et catégorie', () => {
    expect(filterIncidents(incidents, { search: '', country: 'France', category: 'Manifestation' })).toEqual([incidents[0]]);
  });

  it('effectue une recherche sans tenir compte des accents ni de la casse', () => {
    expect(filterIncidents(incidents, { search: 'TEMOIGNAGE', country: 'all', category: 'all' })).toEqual([incidents[0]]);
  });

  it('renvoie une liste vide lorsque rien ne correspond', () => {
    expect(filterIncidents(incidents, { search: 'introuvable', country: 'all', category: 'all' })).toEqual([]);
  });
});
