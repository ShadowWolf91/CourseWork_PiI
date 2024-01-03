export interface IGetStatisticByUserIdRequest {
  ids: number[];
}

export interface IGetStatisticByUserIdResponse {
  id: number;
  rightAnswered: number;
  mark: number;
}
