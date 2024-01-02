import MainValidator from "./mainValidator";
import { TLocation } from "./types";
import { Modes } from "../api/enums";

export default class ProductDataValidator extends MainValidator {
  static subject_id(location: TLocation) {
    return location("subject_id")
      .isInt({ min: 0 })
      .withMessage("SHOULD BE AN INTEGER >= 0")
      .toInt();
  }

  static themeName(
    location: TLocation,
    isOptional: boolean = true,
    length: { min?: number; max: number } | undefined = undefined
  ) {
    return MainValidator.title(location, isOptional, length, "title");
  }

  static questionAmount(location: TLocation, isOptional = false) {
    return isOptional
      ? location("questionAmount")
          .optional({ values: "undefined" })
          .isInt({ min: 0, max: 20 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 20")
          .toInt()
      : location("questionAmount")
          .isInt({ min: 0, max: 20 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 20")
          .toInt();
  }

  static time(location: TLocation, isOptional = false) {
    return isOptional
      ? location("time")
          .optional({ values: "undefined" })
          .isInt({ min: 0, max: 20 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 20")
          .toInt()
      : location("time")
          .isInt({ min: 0, max: 20 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 20")
          .toInt();
  }

  static modes(location: TLocation, isOptional = false) {
    return isOptional
      ? location("modes")
          .isString()
          .withMessage("SHOULD BE STRING")
          .isIn(Object.values(Modes))
          .withMessage(`ALLOWED VALUES: ${Object.values(Modes).join(" | ")}`)
      : location("modes")
          .optional()
          .isString()
          .withMessage("SHOULD BE STRING")
          .isIn(Object.values(Modes))
          .withMessage(`ALLOWED VALUES: ${Object.values(Modes).join(" | ")}`);
  }

  static themeId(location: TLocation) {
    return location("themeId")
      .isInt({ min: 0 })
      .withMessage("SHOULD BE AN INTEGER >= 0")
      .toInt();
  }
}
