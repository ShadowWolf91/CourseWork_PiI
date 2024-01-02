import { IGetThemesResponse } from "../../themes/reg/getAllThemes";

export interface ICreateTestRequest {
  theme_id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  testName: string;
  statistic_id: number;
}

export interface ICreateTestResponse {
  id_test: number;
  theme: IGetThemesResponse;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  testName: string;
  statistic_id: number;
}
