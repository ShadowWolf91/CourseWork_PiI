import MainValidator from "./mainValidator";
import { TLocation } from "./types";

export default class SubjectValidator extends MainValidator {
  static subjectName(
    location: TLocation,
    isOptional: boolean = true,
    length: { min?: number; max: number } | undefined = undefined
  ) {
    return MainValidator.title(location, isOptional, length, "title");
  }

  static id_subject(location: TLocation) {
    return location("idSubject")
      .isInt({ min: 0 })
      .withMessage("SHOULD BE AN INTEGER >= 0")
      .toInt();
  }

  static subjectIdArrayEntries(location: TLocation) {
    return location("subjectsId.*")
      .isInt({ min: 0 })
      .withMessage("SHOULD BE AN INTEGER >= 0")
      .toInt();
  }

  static subjectId(location: TLocation, isArray = false) {
    return isArray
      ? location("subjectsId")
          .isArray()
          .withMessage("SHOULD BE AN ARRAY OF INTEGERS")
      : location("subjectId")
          .isInt({ min: 0 })
          .withMessage("SHOULD BE AN INTEGER >= 0")
          .toInt();
  }
}
