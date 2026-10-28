import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'btf-site-header',
  templateUrl: './site-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHeaderComponent {
  readonly isMapPage = /\/carte\/?$/.test(window.location.pathname);
}
