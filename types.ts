import { LucideIcon } from 'lucide-react';

export enum ToolCategory {
  ALL = 'All Tools',
  DEVELOPER = 'Developer',
  DESIGNER = 'Designer',
  MARKETING = 'Marketing',
  WRITING = 'Writing',
  SEO = 'SEO',
  SOCIAL = 'Social Media',
}

export enum InputType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  CODE = 'code',
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
  isNew?: boolean;
  featured?: boolean;
  systemPrompt: string; // The instruction sent to Gemini
  inputType: InputType;
  inputPlaceholder: string;
  outputLabel: string;
}

export interface GenerationState {
  isLoading: boolean;
  result: string | null;
  error: string | null;
}