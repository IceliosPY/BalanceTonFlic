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
      : /\/documentation\/stuff-utile\/?$/.test(window.location.pathname)
        ? 'documentation-stuff'
        : /\/documentation\/pendant-la-manif\/?$/.test(window.location.pathname)
          ? 'documentation-protest'
          : /\/documentation\/questions\/?$/.test(window.location.pathname)
            ? 'documentation-questions'
            : /\/documentation\/apres-la-gav\/?$/.test(window.location.pathname)
              ? 'documentation-after-custody'
        : /\/documentation\/contacts-ressources\/?$/.test(window.location.pathname)
          ? 'documentation-resources'
          : /\/documentation\/?$/.test(window.location.pathname)
            ? 'documentation'
            : /\/transmettre\/?$/.test(window.location.pathname)
              ? 'submission'
              : 'home';
}
