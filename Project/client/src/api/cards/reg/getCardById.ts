export interface IGetCardByIdRequest {
  id_card: number;
}

export interface IGetCardByIdResponse {
  id_card: number;
  theme_id: number;
  word: string;
  correctAnswer: string;
  cardName: string;
  statistic_id: number;
}
