import { Modes } from "api/enums";
import { IGetSubjectsResponse } from "api/subjects/reg/getAllSubjects";

export interface ICreateThemeRequest {
  subject_id: number;
  themeName: string;
  mode: keyof typeof Modes;
  questionAmount: number;
  time: number;
}

export interface ICreateThemeResponse {
  id_theme: number;
  subject: IGetSubjectsResponse;
  themeName: string;
  mode: keyof typeof Modes;
  questionAmount: number;
  time: number;
}
