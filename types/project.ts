export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  role: string;
  start: string;
  end: string | null;
  result: string;
}
