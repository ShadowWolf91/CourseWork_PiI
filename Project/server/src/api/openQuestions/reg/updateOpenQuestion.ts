export interface IUpdateOpenQuestionRequest {
  openQuestionId: number;
  theme_id?: number;
  question?: string;
  correctAnswer?: string;
  openQuestionName?: string;
}

export interface IUpdateOpenQuestionResponse {
  theme_id: number;
  question: string;
  correctAnswer: string;
  openQuestionName: string;
}
