export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: number; // 1-5 (将来的な拡張用)
  icon?: string;
}
