export type Mood =
  | 'professional'
  | 'playful'
  | 'elegant'
  | 'aggressive'
  | 'minimal'
  | 'retro'
  | 'technical'
  | 'friendly'
  | 'luxury'
  | 'creative';

export type FontStyle = 'serif' | 'sans-serif' | 'monospace' | 'display' | 'handwriting';

export interface FontEntry {
  family: string;        // exact Google Fonts family name
  moods: Mood[];         // 1–3 moods this font fits
  weight: string;        // '400' | '700' | '400,700'
  style: FontStyle;      // 'serif' | 'sans-serif' | 'monospace' | 'display' | 'handwriting'
}
