import { Incident } from './incident';

const MONTHS: Readonly<Record<string, number>> = {
  janvier: 0,
  février: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  décembre: 11
};

export function publicationTime(value: string): number {
  const match = value.toLowerCase().match(/(\d{1,2})\s+([a-zéû]+)\s+(\d{4})/u);
  if (!match) return 0;

  const [, day, month, year] = match;
  return Date.UTC(Number(year), MONTHS[month] ?? 0, Number(day));
}

export function latestIncident(incidents: readonly Incident[]): Incident | null {
  return incidents.reduce<Incident | null>((latest, incident) => {
    if (!latest) return incident;
    return publicationTime(incident.date) >= publicationTime(latest.date) ? incident : latest;
  }, null);
}

export function sortIncidentsNewestFirst(incidents: readonly Incident[]): readonly Incident[] {
  return [...incidents].sort((left, right) => publicationTime(right.date) - publicationTime(left.date));
}
