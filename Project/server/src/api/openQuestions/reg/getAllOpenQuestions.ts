export interface IGetAllOpenQuestionsRequest {
  skip: number;
  take: number;
  cursor?: number;
  openQuestionName?: string;
}

export interface IGetAllOpenQuestionsResponse {
  openQuestionsData: {
    id_openQustion: number;
    theme_id: number;
    question: string;
    correctAnswer: string;
    openQuestionName: string;
  }[];
  cursor: number | null;
}