import { Modes } from "api/enums";

export interface ICreateThemeRequest {
  id_theme: number;
  subject_id: number;
  themeName: string;
  mode: keyof typeof Modes;
  questionAmount: number;
}

export interface ICreateThemeResponse {
  id_theme: number;
  subject_id: number;
  themeName: string;
  mode: keyof typeof Modes;
  questionAmount: number;
}
