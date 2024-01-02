import { Roles } from "../api/enums";
import MainValidator from "./mainValidator";
import { TLocation } from "./types";

export default class UserDataValidator extends MainValidator {
  static username(
    location: TLocation,
    isOptional: boolean = true,
    length: { min?: number; max: number } | undefined = undefined
  ) {
    return MainValidator.title(location, isOptional, length, "username");
  }

  static device_id(location: TLocation, isArray = false) {
    return isArray
      ? location("device_id")
          .isArray()
          .withMessage("SHOULD BE AN ARRAY OF STRINGS")
      : location("device_id")
          .isString()
          .withMessage("SHOULD BE A STRING")
          .not()
          .isEmpty()
          .withMessage("SHOULD BE A NON EMPTY STRING");
  }

  static password(
    location: TLocation,
    isOptional: boolean = false,
    length: { min?: number; max: number } | undefined = undefined
  ) {
    const result = isOptional
      ? location("password").optional({ values: "undefined" })
      : location("password");

    return length
      ? result
          .isLength({
            min: length.min || 0,
            max: length.max,
          })
          .withMessage(`${length?.min || 0} >= LENGTH <= ${length?.max}`)
      : result;
  }

  static user_id(location: TLocation) {
    return location("user_id")
      .isInt({ min: 0 })
      .withMessage("SHOULD BE AN INTEGER >= 0")
      .toInt();
  }

  static role(location: TLocation) {
    return location("role")
      .optional({ values: "undefined" })
      .isString()
      .withMessage("SHOULD BE A STRING")
      .isIn(Object.values(Roles))
      .withMessage({
        message: `SHOULD BE ${Roles.DEFAULT} or ${Roles.TEACHER} or ${Roles.ADMIN}`,
      });
  }

  static refreshToken(location: TLocation) {
    return location("refreshToken")
      .isString()
      .withMessage("SHOULD BE A STRING")
      .not()
      .isEmpty()
      .withMessage("SHOULD BE A STRING");
  }

  static device_idArrayEntries(location: TLocation) {
    return location("deviceId.*")
      .isString()
      .withMessage("SHOULD BE A STRING")
      .not()
      .isEmpty()
      .withMessage("SHOULD BE A STRING");
  }
}
