import { IGetThemesResponse } from "api/themes/reg/getAllThemes";

export interface ICreateOpenQuestionRequest {
  theme_id: number;
  question: string;
  correctAnswer: string;
  openQuestionName: string;
}

export interface ICreateOpenQuestionResponse {
  id_openQuestion: number;
  theme: IGetThemesResponse;
  question: string;
  correctAnswer: string;
  openQuestionName: string;
}
