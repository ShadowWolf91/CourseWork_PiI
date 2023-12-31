export interface IGetOpenQuestionByThemeIdRequest {
  theme_id: number;
}

export interface IGetOpenQuestionByThemeIdResponse {
  theme_id: number;
  openQuestion: {
    question: string;
    correctAnswer: string;
  }[];
}
