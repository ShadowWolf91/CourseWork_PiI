import { Modes } from "api/enums";

export interface IUpdateThemeRequest {
  themeId: number;
  subject_id?: number;
  themeName?: string;
  mode?: keyof typeof Modes;
  time?: number;
}

export interface IUpdateThemeResponse {
  subject_id: number;
  themeName: string;
  mode: keyof typeof Modes;
  time: number;
}
