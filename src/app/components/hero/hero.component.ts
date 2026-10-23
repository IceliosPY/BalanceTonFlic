import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { latestIncident } from '../../models/incident-date';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../services/incident.service';

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
