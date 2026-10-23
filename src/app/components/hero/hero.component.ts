import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../services/incident.service';

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

export function latestIncident(incidents: readonly Incident[]): Incident | null {
  return incidents.reduce<Incident | null>((latest, incident) => {
    if (!latest) return incident;
    return publicationTime(incident.date) >= publicationTime(latest.date) ? incident : latest;
  }, null);
}

function publicationTime(value: string): number {
  const match = value.toLowerCase().match(/(\d{1,2})\s+([a-zéû]+)\s+(\d{4})/u);
  if (!match) return 0;

  const [, day, month, year] = match;
  return Date.UTC(Number(year), MONTHS[month] ?? 0, Number(day));
}

@Component({ selector: 'btf-hero', templateUrl: './hero.component.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class HeroComponent {
  private readonly incidentService = inject(IncidentService);
  private readonly destroyRef = inject(DestroyRef);

  readonly latest = signal<Incident | null>(null);

  constructor() {
    this.incidentService.getIncidents().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (incidents) => this.latest.set(latestIncident(incidents))
    });
  }
}
