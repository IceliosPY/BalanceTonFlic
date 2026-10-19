export interface Incident {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly city: string;
  readonly country: string;
  readonly category: string;
  readonly status: string;
  readonly verified: boolean;
  readonly demo: boolean;
  readonly videoUrl: string;
  readonly audioUrl: string;
  readonly sourceUrl: string;
  readonly tags: readonly string[];
}
