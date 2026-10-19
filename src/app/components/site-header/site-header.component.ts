import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'btf-site-header',
  templateUrl: './site-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHeaderComponent {
  readonly menuOpen = signal(false);

  toggleMenu(): void { this.menuOpen.update((open) => !open); }
  closeMenu(): void { this.menuOpen.set(false); }
}
