export interface IDeleteUserTokensRequest {
  user_id: number;
  devices_id: string[];
}

export interface IDeleteUserTokensResponse {
  count: number;
}
