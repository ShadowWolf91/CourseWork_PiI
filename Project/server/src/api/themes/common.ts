import { Modes } from "../enums";

export interface ThemeData {
  id_theme: number;
  subject_id: number;
  themeName: string;
  mode: keyof typeof Modes;
  time: number;
}
