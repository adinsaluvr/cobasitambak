export type ScreenId = 
  | 'cover'
  | 'intro'
  | 'adventure_zone'
  | 'placeholder';

export type AdventureId =
  | 'jelajah'
  | 'tebak'
  | 'bongkar'
  | 'selamatkan'
  | 'misi'
  | 'lencana';

export interface AdventureMenu {
  id: AdventureId;
  title: string;
  subtitle: string;
  topic: string;
  description: string;
  iconType: 'explore' | 'quiz' | 'book' | 'shield' | 'mission' | 'badge';
  color: string;
  badgeTag: string;
  stageNumber: number;
  previewGoals: string[];
}
