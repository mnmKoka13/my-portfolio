export interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
  github?: string;
  start?: string;
  end?: string | null;
}
