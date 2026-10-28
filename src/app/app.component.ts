import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { DocumentationAfterCustodyComponent } from './components/documentation-after-custody/documentation-after-custody.component';
import { DocumentationProtestComponent } from './components/documentation-protest/documentation-protest.component';
import { DocumentationQuestionsComponent } from './components/documentation-questions/documentation-questions.component';
import { DocumentationResourcesComponent } from './components/documentation-resources/documentation-resources.component';
import { DocumentationStuffComponent } from './components/documentation-stuff/documentation-stuff.component';
import { HeroComponent } from './components/hero/hero.component';
import { ObservatoryComponent } from './components/observatory/observatory.component';
import { PoliceViolenceMapComponent } from './components/police-violence-map/police-violence-map.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SubmissionComponent } from './components/submission/submission.component';

@Component({
  selector: 'btf-root',
  imports: [AboutComponent, DocumentationAfterCustodyComponent, DocumentationComponent, DocumentationProtestComponent, DocumentationQuestionsComponent, DocumentationResourcesComponent, DocumentationStuffComponent, SiteHeaderComponent, HeroComponent, ObservatoryComponent, PoliceViolenceMapComponent, SiteFooterComponent, SubmissionComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
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
