export interface ICreateSessionRequest {
  userId: number;
  themeId: number;
}

export interface ICreateSessionResponse {
  id: number;
  userId: number;
  statisticId: number;
  themeId: number;
}
