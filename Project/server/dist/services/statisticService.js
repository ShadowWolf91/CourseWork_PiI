"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
const prismaClient_1 = tslib_1.__importDefault(require("../prismaClient"));
class UserService {
}
_a = UserService;
UserService.getAllStatistics = async ({ cursor, title, skip, take, }) => prismaClient_1.default.statistics.findMany({
    skip,
    take,
    cursor: cursor ? { id_statistics: cursor } : undefined,
    where: {
        title: { contains: title, mode: "insensitive" },
    },
});
UserService.getStatisticByUserId = async ({ ids }) => prismaClient_1.default.statistics.findMany({
    where: { id_statistics: { in: ids } },
});
UserService.updateStatisticsData = async ({ id_statistics, rightAnswered, score, mark, user_id, }) => {
    const statistic = await prismaClient_1.default.statistics.findUnique({
        where: { id_statistics: id_statistics },
        select: { id_statistics: true },
    });
    if (!statistic)
        throw userRequestError_1.default.NotFound(`STATISTIC WITH ID ${id_statistics} NOT FOUND`);
    return prismaClient_1.default.statistics.update({
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
exports.default = UserService;
//# sourceMappingURL=statisticService.js.map