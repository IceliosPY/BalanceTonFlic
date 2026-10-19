import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../services/incident.service';
import { filterIncidents } from './incident-filter';

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
  readonly search = signal('');
  readonly country = signal('all');
  readonly category = signal('all');
  readonly selected = signal<Incident | null>(null);

  readonly countries = computed(() => this.uniqueSorted(this.incidents().map((incident) => incident.country)));
  readonly categories = computed(() => this.uniqueSorted(this.incidents().map((incident) => incident.category)));
  readonly filteredIncidents = computed(() => filterIncidents(this.incidents(), {
    search: this.search(), country: this.country(), category: this.category()
  }));

  constructor() {
    this.incidentService.getIncidents().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (incidents) => { this.incidents.set(incidents); this.loading.set(false); },
      error: () => { this.loadError.set(true); this.loading.set(false); }
    });
  }

  updateSearch(event: Event): void { this.search.set((event.currentTarget as HTMLInputElement).value); }
  updateCountry(event: Event): void { this.country.set((event.currentTarget as HTMLSelectElement).value); }
  updateCategory(event: Event): void { this.category.set((event.currentTarget as HTMLSelectElement).value); }

  resetFilters(): void {
    this.search.set('');
    this.country.set('all');
    this.category.set('all');
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

  private uniqueSorted(values: readonly string[]): readonly string[] {
    return [...new Set(values)].sort((a, b) => a.localeCompare(b, 'fr'));
  }
}
