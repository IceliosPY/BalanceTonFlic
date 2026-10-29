import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocumentationEntry } from '../documentation-entry';

@Component({
  selector: 'btf-documentation-questions',
  templateUrl: './documentation-questions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationQuestionsComponent {
  protected readonly entries: readonly DocumentationEntry[] = [
    {
      number: '01',
      title: 'Sur la question du téléphone',
      paragraphs: ['Sur la question du téléphone (encore).'],
      href: 'https://www.youtube.com/shorts/-cVPKvIsA5s',
      action: 'Voir la vidéo'
    },
    {
      number: '02',
      eyebrow: 'Pendant la manif',
      title: 'Un keuf doit-il toujours avoir son RIO affiché et visible ?',
      paragraphs: ['Un keuf doit toujours avoir son RIO affiché et visible. S’il n’en a pas, FILMEZ.']
    },
    {
      number: '03',
      eyebrow: 'Pendant la manif',
      title: 'La police a-t-elle le droit de vous fouiller sans autorisation explicite de votre part ?',
      paragraphs: ['Non, elle doit avoir soit une autorisation explicite, soit une réquisition d’un procureur.']
    },
    {
      number: '04',
      eyebrow: 'Pendant la manif',
      title: 'Que faire si quelqu’un fait une crise d’asthme ou de panique ?',
      paragraphs: ['Extraire la personne le plus vite possible avant les tirs ou les charges, toujours à au moins deux personnes.']
    },
    {
      number: '05',
      eyebrow: 'Pendant la manif',
      title: 'Je me retrouve seul et je souhaite partir',
      paragraphs: ['Restez groupé·es. Si une personne doit partir, elle est accompagnée de deux autres personnes. La police peut tout à fait organiser des rafles pour récupérer les personnes tentant de sortir de la manifestation.']
    },
    {
      number: '06',
      eyebrow: 'Pendant la manif',
      title: 'La police vient de tirer des lacrymogènes et d’autres grenades',
      paragraphs: [
        'Ne touchez pas les objets tombés, en particulier les grenades. N’essayez surtout pas de renvoyer les grenades : c’est comme ça que des Gilets jaunes et des adolescents perdent des mains la plupart du temps, voire même le bras !',
        'Pour les lacrymogènes, le mieux est d’utiliser une technique pour les éteindre : utiliser un plot de sécurité pour contenir le gaz et l’éteindre avec de l’eau.'
      ]
    },
    {
      number: '07',
      eyebrow: 'Pendant la manif',
      title: 'J’ai été ajouté à un groupe avant le début de la manifestation : dois-je tout supprimer avant qu’elle commence ?',
      paragraphs: ['En cas d’organisation sur les réseaux sociaux : supprimez les groupes AVANT le début de la manifestation. Cela peut être utilisé par la police pour vous incriminer !']
    }
  ];

  protected selectedEntry = 0;

  protected get activeEntry(): DocumentationEntry {
    return this.entries[this.selectedEntry];
  }
}
