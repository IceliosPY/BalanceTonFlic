import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { sortIncidentsNewestFirst } from '../../models/incident-date';
import { pageUrlWithoutVideo, videoCodeFromUrl, videoShareUrl } from '../../models/incident-share';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../services/incident.service';
import { filterIncidents, paginateIncidents } from './incident-filter';

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
  readonly linkCopied = signal(false);
  readonly search = signal('');
  readonly currentPage = signal(1);
  readonly pageSize = 10;
  readonly filteredIncidents = computed(() => filterIncidents(this.incidents(), {
    search: this.search(),
    country: 'all',
    category: 'all'
  }));
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filteredIncidents().length / this.pageSize)));
  readonly pages = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));
  readonly visibleIncidents = computed(() => paginateIncidents(
    this.filteredIncidents(),
    this.currentPage(),
    this.pageSize
  ));

  constructor() {
    this.incidentService.getIncidents().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (incidents) => {
        this.incidents.set(sortIncidentsNewestFirst(incidents));
        this.loading.set(false);
        this.syncDialogWithUrl();
      },
      error: () => { this.loadError.set(true); this.loading.set(false); }
    });

    fromEvent(window, 'popstate').pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.syncDialogWithUrl());
  }

  openIncident(incident: Incident): void {
    this.selected.set(incident);
    this.linkCopied.set(false);
    if (!this.dialog().nativeElement.open) this.dialog().nativeElement.showModal();
    window.history.pushState({}, '', videoShareUrl(window.location.href, incident.id));
  }

  closeDialog(): void {
    if (this.dialog().nativeElement.open) this.dialog().nativeElement.close();
  }

  handleDialogClosed(): void {
    this.selected.set(null);
    this.linkCopied.set(false);
    window.history.replaceState({}, '', pageUrlWithoutVideo(window.location.href));
  }

  closeOnBackdrop(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.closeDialog();
  }

  async copyShareLink(incident: Incident): Promise<void> {
    try {
      await navigator.clipboard.writeText(videoShareUrl(window.location.href, incident.id));
      this.linkCopied.set(true);
      window.setTimeout(() => this.linkCopied.set(false), 2200);
    } catch {
      this.linkCopied.set(false);
    }
  }

  isDirectVideo(url: string): boolean { return /\.(mp4|webm)(\?.*)?$/i.test(url); }

  updateSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    const nextPage = Math.min(Math.max(1, page), this.totalPages());
    if (nextPage === this.currentPage()) return;
    this.currentPage.set(nextPage);
    document.getElementById('observatoire')?.scrollIntoView({ behavior: 'smooth' });
  }

  private syncDialogWithUrl(): void {
    const code = videoCodeFromUrl(window.location.href);
    const incident = code ? this.incidents().find((candidate) => candidate.id === code) : null;

    if (incident) {
      this.selected.set(incident);
      this.linkCopied.set(false);
      if (!this.dialog().nativeElement.open) this.dialog().nativeElement.showModal();
      // Old links used `?v=…`. Keep them working, but expose the dedicated
      // static share page in the address bar so copied links get rich previews.
      const shareUrl = videoShareUrl(window.location.href, incident.id);
      if (window.location.href !== shareUrl) window.history.replaceState({}, '', shareUrl);
      return;
    }

    if (this.dialog().nativeElement.open) this.dialog().nativeElement.close();
    if (code) window.history.replaceState({}, '', pageUrlWithoutVideo(window.location.href));
  }
}
