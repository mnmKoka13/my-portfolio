export interface PersonalWork {
  id: string;
  title: string;
  type: 'mobile' | 'web';
  description: string;
  images: string[];
  tech: string[];
  url?: string;
  github?: string;
  status: string;
}
