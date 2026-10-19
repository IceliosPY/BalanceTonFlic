import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'btf-hero', templateUrl: './hero.component.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class HeroComponent {}
