import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocumentationEntry } from '../documentation-entry';

@Component({
  selector: 'btf-documentation-protest',
  templateUrl: './documentation-protest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationProtestComponent {
  protected readonly entries: readonly DocumentationEntry[] = [
    {
      number: '01',
      title: 'Sortir de la nasse + que faire en cas de comparution immédiate',
      href: 'https://www.instagram.com/reel/DemmRxSNLCZ/',
      action: 'Voir la vidéo'
    }
  ];

  protected selectedEntry = 0;

  protected get activeEntry(): DocumentationEntry {
    return this.entries[this.selectedEntry];
  }
}
