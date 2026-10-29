import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocumentationEntry } from '../documentation-entry';

@Component({
  selector: 'btf-documentation-after-custody',
  templateUrl: './documentation-after-custody.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationAfterCustodyComponent {
  protected readonly entries: readonly DocumentationEntry[] = [
    {
      number: '01',
      title: 'Contacter une orga antirep',
      paragraphs: ['Si ce n’est pas déjà fait : contactez une orga antirep ! Elle vous guidera.']
    },
    {
      number: '02',
      title: 'Rapport écrit et certificat médical daté',
      paragraphs: ['Si vous avez fait faire un certificat médical et que l’on vous a frappé pendant la GAV, à l’issue de la GAV, demandez le rapport ÉCRIT de la GAV et filez faire un nouveau certificat médical DATÉ.']
    }
  ];

  protected selectedEntry = 0;

  protected get activeEntry(): DocumentationEntry {
    return this.entries[this.selectedEntry];
  }
}
