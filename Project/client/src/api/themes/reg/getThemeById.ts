import { Modes } from "api/enums";

export interface IGetThemeByIdRequest {
  id_theme: number;
}

export interface IGetThemeByIdResponse {
  id_theme: number;
  subject_id: number;
  themeName: string;
  mode: keyof typeof Modes;
  questionAmount: number;
  time: number;
}
