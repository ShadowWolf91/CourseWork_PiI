import MainValidator from "./mainValidator";
import { TLocation } from "./types";

export default class ProductDataValidator extends MainValidator {
  static user_id(location: TLocation) {
    return MainValidator.id(location, "theme_id");
  }

  static rightAnsweredTests(location: TLocation, isOptional = false) {
    return isOptional
      ? location("rightAnsweredTests")
          .optional({ values: "undefined" })
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt()
      : location("rightAnsweredTests")
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt();
  }

  static rightAnsweredCards(location: TLocation, isOptional = false) {
    return isOptional
      ? location("rightAnsweredCards")
          .optional({ values: "undefined" })
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt()
      : location("rightAnsweredCards")
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt();
  }

  static rightAnsweredOQs(location: TLocation, isOptional = false) {
    return isOptional
      ? location("rightAnsweredOQs")
          .optional({ values: "undefined" })
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt()
      : location("rightAnsweredOQs")
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt();
  }

  static markTests(location: TLocation, isOptional = false) {
    return isOptional
      ? location("markTests")
          .optional({ values: "undefined" })
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt()
      : location("markTests")
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt();
  }

  static markCards(location: TLocation, isOptional = false) {
    return isOptional
      ? location("markCards")
          .optional({ values: "undefined" })
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt()
      : location("markCards")
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt();
  }

  static markOpenQuestions(location: TLocation, isOptional = false) {
    return isOptional
      ? location("markOpenQuestions")
          .optional({ values: "undefined" })
          .isInt({ min: 0, max: 32767 })
          .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
          .toInt()
      : location("markOpenQuestions")
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
