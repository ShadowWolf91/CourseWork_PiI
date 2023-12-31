export interface IGetTestByThemeIdRequest {
  theme_id: number;
}

export interface IGetTestByThemeIdResponse {
  theme_id: number;
  test: {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
  }[];
}
