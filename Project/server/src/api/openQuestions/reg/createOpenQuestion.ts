export interface ICreateOpenQuestionRequest {
  theme_id: number;
  question: string;
  correctAnswer: string;
  openQuestionName: string;
  statistic_id: number;
}

export interface ICreateOpenQuestionResponse {
  id_openQustion: number;
  theme_id: number;
  question: string;
  correctAnswer: string;
  openQuestionName: string;
  statistic_id: number;
}
