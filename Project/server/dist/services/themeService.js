"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
const prismaClient_1 = tslib_1.__importDefault(require("../prismaClient"));
class ThemeService {
}
_a = ThemeService;
ThemeService.getThemeById = async ({ id_theme, }) => {
    const theme = await prismaClient_1.default.themes.findUnique({
        where: { id_theme: +id_theme },
    });
    if (!theme)
        throw userRequestError_1.default.NotFound(`THEME WITH ID ${id_theme} NOT FOUND`);
    return {
        ...theme,
    };
};
ThemeService.getBySubjectId = async ({ subject_id, }) => {
    const theme = await prismaClient_1.default.themes.findMany({
        select: {
            themeName: true,
        },
        where: { subject_id: +subject_id },
    });
    if (!theme)
        throw userRequestError_1.default.NotFound(`THEME WITH SUBJECT_ID ${subject_id} NOT FOUND`);
    return {
        subject_id,
        themeName: theme.map((t) => t.themeName),
    };
};
ThemeService.getAllThemes = async ({ cursor, themeName, skip, take, }) => prismaClient_1.default.themes.findMany({
    skip: skip,
    take: take,
    cursor: cursor ? { id_theme: cursor } : undefined,
    where: { themeName: { contains: themeName, mode: "insensitive" } },
});
ThemeService.createTheme = async ({ subject_id, themeName, mode, questionAmount, time, }) => {
    const theme = await prismaClient_1.default.themes.findUnique({
        where: { themeName },
        select: { id_theme: true },
    });
    if (theme)
        throw userRequestError_1.default.BadRequest(`THEME WITH ID ${themeName} ALREADY EXISTS`);
    return prismaClient_1.default.themes.create({
        data: {
            subject_id,
            themeName,
            mode,
            questionAmount,
            time,
        },
    });
};
ThemeService.updateTheme = async ({ id_theme, subject_id, themeName, mode, questionAmount, time, }) => {
    const theme = await prismaClient_1.default.themes.findUnique({
        where: { id_theme },
        select: { id_theme: true },
    });
    if (!theme)
        throw userRequestError_1.default.NotFound(`STORE WITH ID ${id_theme} NOT FOUND`);
    return prismaClient_1.default.themes.update({
        where: { id_theme },
        data: {
            subject_id,
            themeName,
            mode,
            questionAmount,
            time,
        },
    });
};
ThemeService.deleteTheme = async ({ id_theme }) => {
    const theme = await prismaClient_1.default.themes.findUnique({
        where: { id_theme: id_theme },
        select: { id_theme: true },
    });
    if (!theme)
        throw userRequestError_1.default.NotFound(`THEME WITH ID ${id_theme} NOT FOUND`);
    return prismaClient_1.default.themes.delete({
        where: { id_theme: id_theme },
    });
};
exports.default = ThemeService;
//# sourceMappingURL=themeService.js.map