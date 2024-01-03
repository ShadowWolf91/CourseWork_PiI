import MainValidator from "./mainValidator";
import { TLocation } from "./types";

export default class ProductDataValidator extends MainValidator {
  static theme_id(location: TLocation) {
    return MainValidator.id(location, "theme_id");
  }

  static word(location: TLocation) {
    return location("word")
      .isString()
      .withMessage("SHOULD BE A STRING")
      .not()
      .isEmpty()
      .withMessage("SHOULD BE A STRING");
  }

  static correctAnswer(location: TLocation) {
    return location("word")
      .isString()
      .withMessage("SHOULD BE A STRING")
      .not()
      .isEmpty()
      .withMessage("SHOULD BE A STRING");
  }

  static cardName(
    location: TLocation,
    isOptional: boolean = true,
    length: { min?: number; max: number } | undefined = undefined
  ) {
    return MainValidator.title(location, isOptional, length, "title");
  }

  static cardId(location: TLocation) {
    return location("cardId")
      .isInt({ min: 0 })
      .withMessage("SHOULD BE AN INTEGER >= 0")
      .toInt();
  }
}
