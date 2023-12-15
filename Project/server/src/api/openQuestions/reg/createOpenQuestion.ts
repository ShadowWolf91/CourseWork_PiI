export interface ICreateOpenQuestionRequest {
  theme_id: number;
  question: string;
  correctAnswer: string;
  openQuestionName: string;
}

export interface ICreateOpenQuestionResponse {
  id_openQustion: number;
  theme_id: number;
  question: string;
  correctAnswer: string;
  openQuestionName: string;
}
