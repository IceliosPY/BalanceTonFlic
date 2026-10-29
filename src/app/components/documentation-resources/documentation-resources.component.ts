import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocumentationEntry } from '../documentation-entry';

@Component({
  selector: 'btf-documentation-resources',
  templateUrl: './documentation-resources.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationResourcesComponent {
  protected readonly entries: readonly DocumentationEntry[] = [
    {
      number: '01',
      title: 'Guide LDH du manifestant',
      paragraphs: ['Gros rappel des protocoles policier, rappels juridictionnels qui recoupent ce qui a déjà été dit avant.'],
      href: 'https://www.ldh-france.org/wp-content/uploads/2023/01/GUIDE_LDH_MANIFESTANT_DEF-23-07-21.pdf',
      action: 'Consulter le PDF'
    },
    {
      number: '02',
      title: 'ViolencesPolicieres.fr',
      paragraphs: ['Site au sujet des violences policières.'],
      href: 'https://violencespolicieres.fr/',
      action: 'Consulter le site'
    }
  ];

  protected selectedEntry = 0;

  protected get activeEntry(): DocumentationEntry {
    return this.entries[this.selectedEntry];
  }
}
