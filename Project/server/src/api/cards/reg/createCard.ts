import { IGetThemesResponse } from "api/themes/reg/getAllThemes";

export interface ICreateCardRequest {
  theme_id: number;
  word: string;
  correctAnswer: string;
  cardName: string;
  statistic_id: number;
}

export interface ICreateCardResponse {
  id_card: number;
  theme: IGetThemesResponse;
  word: string;
  correctAnswer: string;
  cardName: string;
  statistic_id: number;
}
