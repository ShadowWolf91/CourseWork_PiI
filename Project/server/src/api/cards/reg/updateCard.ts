export interface IUpdateCardRequest {
  cardId: number;
  word?: string;
  correctAnswer?: string;
  cardName?: string;
}

export interface IUpdateCardResponse {
  word: string;
  correctAnswer: string;
  cardName: string;
}
