import { Incident } from '../../models/incident';

export interface IncidentFilters {
  readonly search: string;
  readonly country: string;
  readonly category: string;
}

export function filterIncidents(incidents: readonly Incident[], filters: IncidentFilters): readonly Incident[] {
  const query = normalize(filters.search);
  return incidents.filter((incident) => {
    const haystack = normalize([
      incident.title, incident.description, incident.city, incident.country, incident.category, ...incident.tags
    ].join(' '));
    return (!query || haystack.includes(query)) &&
      (filters.country === 'all' || incident.country === filters.country) &&
      (filters.category === 'all' || incident.category === filters.category);
  });
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
