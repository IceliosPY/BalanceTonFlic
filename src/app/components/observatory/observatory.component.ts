import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { sortIncidentsNewestFirst } from '../../models/incident-date';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'btf-observatory',
  templateUrl: './observatory.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObservatoryComponent {
  private readonly incidentService = inject(IncidentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  readonly incidents = signal<readonly Incident[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal(false);
  readonly selected = signal<Incident | null>(null);

  constructor() {
    this.incidentService.getIncidents().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (incidents) => { this.incidents.set(sortIncidentsNewestFirst(incidents)); this.loading.set(false); },
      error: () => { this.loadError.set(true); this.loading.set(false); }
    });
  }

  openIncident(incident: Incident): void {
    this.selected.set(incident);
    this.dialog().nativeElement.showModal();
  }

  closeDialog(): void {
    this.dialog().nativeElement.close();
    this.selected.set(null);
  }

  closeOnBackdrop(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.closeDialog();
  }

  isDirectVideo(url: string): boolean { return /\.(mp4|webm)(\?.*)?$/i.test(url); }
}
