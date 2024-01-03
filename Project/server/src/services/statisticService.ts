import { IGetAllStatisticsRequest } from "../api/statistics/reg/getAllStatistics";
import { IUpdateStatisticRequest } from "../api/statistics/reg/updateStatistics";
import { IGetStatisticByUserIdRequest } from "../api/statistics/reg/getStatisticByUserId";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";

export default class UserService {
  //get
  static getAllStatistics = async ({
    cursor,
    skip,
    take,
  }: IGetAllStatisticsRequest) =>
    prismaClient.statistics.findMany({
      skip: skip,
      take: take,
      cursor: cursor ? { id: cursor } : undefined,
    });

  static getStatisticByUserId = async ({ ids }: IGetStatisticByUserIdRequest) =>
    prismaClient.statistics.findMany({
      where: { id: { in: ids } },
    });

  //update
  static updateStatisticsData = async ({
    id,
    rightAnswered,
    mark,
  }: IUpdateStatisticRequest) => {
    const statistic = await prismaClient.statistics.findUnique({
      where: { id: id },
      select: { id: true },
    });
    if (!statistic)
      throw UserRequestError.NotFound(`STATISTIC WITH ID ${id} NOT FOUND`);

    return prismaClient.statistics.update({
      where: { id: id },
      data: {
        id,
        rightAnswered,
        mark,
      },
    });
  };
}
