import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { MethodologyComponent } from './components/methodology/methodology.component';
import { MovementComponent } from './components/movement/movement.component';
import { ObservatoryComponent } from './components/observatory/observatory.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';

@Component({
  selector: 'btf-root',
  imports: [SiteHeaderComponent, HeroComponent, ObservatoryComponent, MethodologyComponent, MovementComponent, SiteFooterComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
