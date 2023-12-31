import { Router } from "express";
import { body, query } from "express-validator";
import ThemeEndpoints from "../api/themes/endpoints";
import ThemeController from "../controllers/themeController";
import ThemeDataValidator from "../validators/themeValidator";

const themeRouter = Router();

themeRouter.get(
  ThemeEndpoints.GET_BY_ID,
  ThemeDataValidator.id(query),
  ThemeController.getThemeById
);

themeRouter.get(
  ThemeEndpoints.GET_BY_SUBJECT_ID,
  ThemeDataValidator.subject_id(query),
  ThemeController.getBySubjectId
);

themeRouter.get(
  ThemeEndpoints.GET_ALL_THEMES,
  ThemeDataValidator.title(query),
  ThemeDataValidator.cursor(query),
  ThemeDataValidator.skip(query),
  ThemeDataValidator.take(query),
  ThemeController.getAllThemes
);

themeRouter.get(
  ThemeEndpoints.GET_THEMES_CARD,
  ThemeController.getThemesForCards
);

themeRouter.get(
  ThemeEndpoints.GET_THEMES_TEST,
  ThemeController.getThemesForTests
);

themeRouter.get(
  ThemeEndpoints.GET_THEMES_OPEN_QUESTION,
  ThemeController.getThemesForOpenQuestions
);

themeRouter.post(
  ThemeEndpoints.CREATE,
  ThemeDataValidator.themeName(body, true, { max: 50 }),
  ThemeDataValidator.subject_id(body),
  ThemeDataValidator.mode(body),
  ThemeController.createTheme
);

themeRouter.patch(
  ThemeEndpoints.UPDATE,
  ThemeDataValidator.themeId(body),
  ThemeDataValidator.themeName(body, true, { max: 50 }),
  // ThemeDataValidator.subject_id(body),
  ThemeDataValidator.mode(body, true),
  ThemeController.updateTheme
);

themeRouter.delete(
  ThemeEndpoints.DELETE,
  ThemeDataValidator.themeId(body),
  ThemeController.deleteTheme
);

export default themeRouter;
