export interface IUpdateOpenQuestionRequest {
  id_openQustion: number;
  theme_id?: number;
  question?: string;
  correctAnswer?: string;
  openQuestionName?: string;
  statistic_id?: number;
}

export interface IUpdateOpenQuestionResponse {
  id_openQustion: number;
  theme_id: number;
  question: string;
  correctAnswer: string;
  openQuestionName: string;
  statistic_id: number;
}
