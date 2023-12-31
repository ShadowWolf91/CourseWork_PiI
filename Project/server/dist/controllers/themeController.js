"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const callUnprocessableEntity_1 = tslib_1.__importDefault(require("../extra/callUnprocessableEntity"));
const getValidationResult_1 = tslib_1.__importDefault(require("../extra/getValidationResult"));
const themeService_1 = tslib_1.__importDefault(require("../services/themeService"));
class ThemeController {
}
_a = ThemeController;
ThemeController.getThemeById = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await themeService_1.default.getThemeById(req.query);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
ThemeController.getBySubjectId = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await themeService_1.default.getBySubjectId(req.query);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
ThemeController.getAllThemes = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await themeService_1.default.getAllThemes(req.query);
        res.json({
            themesData: result,
            cursor: result[result.length - 1]?.id_theme || null,
        });
    }
    catch (e) {
        return next(e);
    }
};
ThemeController.createTheme = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await themeService_1.default.createTheme(req.body);
        res.status(201).json(result);
    }
    catch (e) {
        return next(e);
    }
};
ThemeController.updateTheme = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await themeService_1.default.updateTheme(req.body);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
ThemeController.deleteTheme = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        await themeService_1.default.deleteTheme(req.body);
        res.json({ count: 1 });
    }
    catch (e) {
        return next(e);
    }
};
exports.default = ThemeController;
//# sourceMappingURL=themeController.js.map