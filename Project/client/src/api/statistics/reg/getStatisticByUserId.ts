export interface IGetStatisticByUserIdRequest {
  ids: number[];
}

export interface IGetStatisticByUserIdResponse {
  id_statistics: number;
  rightAnswered: number;
  score: number;
  mark: number;
  user_id: number;
  title: string;
}
