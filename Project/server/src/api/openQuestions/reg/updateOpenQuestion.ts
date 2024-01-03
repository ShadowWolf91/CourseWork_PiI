export interface IUpdateOpenQuestionRequest {
  id_openQuestion: number;
  theme_id?: number;
  question?: string;
  correctAnswer?: string;
  openQuestionName?: string;
}

export interface IUpdateOpenQuestionResponse {
  id_openQuestion: number;
  theme_id: number;
  question: string;
  correctAnswer: string;
  openQuestionName: string;
}
