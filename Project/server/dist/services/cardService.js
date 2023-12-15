"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
const prismaClient_1 = tslib_1.__importDefault(require("../prismaClient"));
class CardService {
}
_a = CardService;
CardService.getAllCards = async ({ cursor, cardName, skip, take, }) => prismaClient_1.default.cards.findMany({
    skip,
    take,
    cursor: cursor ? { id_card: cursor } : undefined,
    where: { cardName: { contains: cardName, mode: "insensitive" } },
});
CardService.createCard = async ({ theme_id, word, correctAnswer, cardName, }) => {
    const card = await prismaClient_1.default.cards.findUnique({
        where: { cardName },
        select: { id_card: true },
    });
    if (!card)
        throw userRequestError_1.default.NotFound(`CARD WITH NAME ${cardName} CREATED`);
    return prismaClient_1.default.cards.create({
        data: {
            theme_id,
            word,
            correctAnswer,
            cardName,
        },
    });
};
CardService.updateCardData = async ({ id_card, theme_id, word, correctAnswer, cardName, }) => {
    const card = await prismaClient_1.default.cards.findUnique({
        where: { id_card },
        select: { id_card: true },
    });
    if (!card)
        throw userRequestError_1.default.NotFound(`CARD WITH ID ${id_card} NOT FOUND`);
    return prismaClient_1.default.cards.update({
        where: { id_card },
        data: {
            id_card,
            theme_id,
            word,
            correctAnswer,
            cardName,
        },
    });
};
CardService.deleteCard = async ({ id_card }) => {
    const card = await prismaClient_1.default.cards.findUnique({
        where: { id_card: id_card },
        select: { id_card: true },
    });
    if (!card)
        throw userRequestError_1.default.NotFound(`CARD WITH ID ${id_card} NOT FOUND`);
    return prismaClient_1.default.cards.delete({
        where: { id_card: id_card },
    });
};
exports.default = CardService;
//# sourceMappingURL=cardService.js.map