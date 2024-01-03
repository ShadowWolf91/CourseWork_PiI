import MainValidator from "./mainValidator";
import { TLocation } from "./types";

export default class ProductDataValidator extends MainValidator {
  static user_id(location: TLocation) {
    return MainValidator.id(location, "theme_id");
  }

  static rightAnswered(location: TLocation, isOptional = false) {
    return isOptional
      ? location("rightAnswered")
          .optional({ values: "undefined" })
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt()
      : location("rightAnswered")
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt();
  }

  static mark(location: TLocation, isOptional = false) {
    return isOptional
      ? location("mark")
          .optional({ values: "undefined" })
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt()
      : location("mark")
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt();
  }

  static title(
    location: TLocation,
    isOptional: boolean = true,
    length: { min?: number; max: number } | undefined = undefined
  ) {
    return MainValidator.title(location, isOptional, length, "title");
  }
}
