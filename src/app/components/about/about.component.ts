import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'btf-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}
