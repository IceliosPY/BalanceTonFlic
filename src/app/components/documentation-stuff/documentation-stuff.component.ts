import { ChangeDetectionStrategy, Component } from '@angular/core';

interface GuideTopic {
  number: string;
  title: string;
  advice?: readonly string[];
  adviceList?: readonly string[];
  justification?: readonly string[];
  justificationList?: readonly string[];
  emptyJustification?: boolean;
}

@Component({
  selector: 'btf-documentation-stuff',
  templateUrl: './documentation-stuff.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationStuffComponent {
  protected readonly topics: readonly GuideTopic[] = [
    {
      number: '01',
      title: 'Sérum physiologique',
      advice: ['Ne tentez pas de le faire vous-même si vous ne savez pas faire.'],
      justification: [
        'Le sérum physiologique, ce n’est pas juste de l’eau chaude avec du sel. Avec un mauvais dosage, vous vous abîmez l’œil.'
      ]
    },
    {
      number: '02',
      title: 'Bouffe et eau',
      advice: ['Toujours un peu plus que prévu.'],
      justification: [
        'En cas de nasses longues, vous n’aurez pas forcément la possibilité de rentrer aussi rapidement que prévu.'
      ]
    },
    {
      number: '03',
      title: 'Chaussures',
      advice: ['Prenez des chaussures amples, pas non plus des bottes, mais pas des tongs.'],
      emptyJustification: true
    },
    {
      number: '04',
      title: 'Contacts',
      advice: [
        'Un papier avec un numéro d’avocat ou les contacts d’une association d’anti-répression : Riposte Collective, RAJ Collective, Legal Team Antiraciste.',
        'Gardez toujours un numéro d’urgence, un avocat, un proche qui n’est pas dans la manifestation.'
      ],
      emptyJustification: true
    },
    {
      number: '05',
      title: 'Vêtements',
      adviceList: [
        'Vêtements en coton, pas de synthétique.',
        'Pas de lentilles.',
        'Pas de lunettes de piscine.'
      ],
      justificationList: [
        'Le synthétique fond.',
        'Les lunettes de piscine tiennent mal les chocs.'
      ]
    },
    {
      number: '06',
      title: 'Crèmes',
      advice: [
        'Le mieux, c’est pas de crème. Si vous avez besoin d’en mettre, utilisez des crèmes solaires à base d’eau, surtout pas d’huile.'
      ],
      justification: ['Évitez les crèmes grasses qui retiennent les lacrymos.']
    },
    {
      number: '07',
      title: 'Masques',
      advice: ['Des masques FFP2 ou en coton.'],
      justification: [
        'Évitez les masques synthétiques pour les mêmes raisons que les vêtements en synthétique.'
      ]
    }
  ];

  protected selectedTopic = 0;

  protected get activeTopic(): GuideTopic {
    return this.topics[this.selectedTopic];
  }
}
