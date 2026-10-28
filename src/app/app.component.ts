import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { ObservatoryComponent } from './components/observatory/observatory.component';
import { PoliceViolenceMapComponent } from './components/police-violence-map/police-violence-map.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';

@Component({
  selector: 'btf-root',
  imports: [SiteHeaderComponent, HeroComponent, ObservatoryComponent, PoliceViolenceMapComponent, SiteFooterComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly isMapPage = /\/carte\/?$/.test(window.location.pathname);
}
