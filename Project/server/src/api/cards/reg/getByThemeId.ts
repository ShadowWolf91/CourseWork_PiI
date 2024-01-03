export interface IGetCardByThemeIdRequest {
  theme_id: number;
}

export interface IGetCardByThemeIdResponse {
  theme_id: number;
  card: {
    id_card: number;
    word: string;
    correctAnswer: string;
  }[];
}
