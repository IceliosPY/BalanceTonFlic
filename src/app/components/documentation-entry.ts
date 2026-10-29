export interface DocumentationEntry {
  number: string;
  title: string;
  eyebrow?: string;
  paragraphs?: readonly string[];
  href?: string;
  action?: string;
}
