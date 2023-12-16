import { IGetAllStatisticsRequest } from "../api/statistics/reg/getAllStatistics";
import { IUpdateStatisticRequest } from "../api/statistics/reg/updateStatistics";
import { IGetStatisticByUserIdRequest } from "../api/statistics/reg/getStatisticByUserId";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";

export default class UserService {
  //get
  static getAllStatistics = async ({
    cursor,
    title,
    skip,
    take,
  }: IGetAllStatisticsRequest) =>
    prismaClient.statistics.findMany({
      skip,
      take,
      cursor: cursor ? { id_statistics: cursor } : undefined,
      where: {
        title: { contains: title, mode: "insensitive" },
      },
    });

  static getStatisticByUserId = async ({ ids }: IGetStatisticByUserIdRequest) =>
    prismaClient.statistics.findMany({
      where: { id_statistics: { in: ids } },
    });

  //update
  static updateStatisticsData = async ({
    id_statistics,
    rightAnswered,
    score,
    mark,
    user_id,
  }: IUpdateStatisticRequest) => {
    const statistic = await prismaClient.statistics.findUnique({
      where: { id_statistics: id_statistics },
      select: { id_statistics: true },
    });
    if (!statistic)
      throw UserRequestError.NotFound(
        `STATISTIC WITH ID ${id_statistics} NOT FOUND`
      );

    return prismaClient.statistics.update({
      where: { id_statistics: id_statistics },
      data: {
        id_statistics,
        rightAnswered,
        score,
        mark,
        user_id,
      },
    });
  };
}
