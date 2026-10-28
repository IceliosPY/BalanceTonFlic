import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'btf-site-header',
  templateUrl: './site-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHeaderComponent {
  readonly currentPage = /\/carte\/?$/.test(window.location.pathname)
    ? 'map'
    : /\/a-propos\/?$/.test(window.location.pathname)
      ? 'about'
      : /\/documentation\/?$/.test(window.location.pathname)
        ? 'documentation'
        : /\/transmettre\/?$/.test(window.location.pathname)
          ? 'submission'
          : 'home';
}
