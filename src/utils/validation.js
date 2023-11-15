import validator from "is_js";

const checkEmpty = (val, key) => {
  if (validator.empty(val.trim())) {
    return `Please enter ${key}`;
  } else {
    return "";
  }
};

const checkMinLength = (val, minLength, key) => {
  if (val.trim().length < minLength) {
    return `Please enter valid ${key}`;
  } else {
    return "";
  }
};

export default function (data) {
  const { firstName, lastName, email, password, confirmPassword } = data;

  if (firstName !== undefined) {
    let emptyValidationText = checkEmpty(firstName, "First Name");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLenghtValidation = checkMinLength(firstName, 3, "First Name");
      if (minLenghtValidation !== "") {
        return minLenghtValidation;
      }
    }
  }

  if (lastName !== undefined) {
    let emptyValidationText = checkEmpty(lastName, "Last Name");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLenghtValidation = checkMinLength(lastName, 3, "Last Name");
      if (minLenghtValidation !== "") {
        return minLenghtValidation;
      }
    }
  }

  if (email !== undefined) {
    let emptyValidationText = checkEmpty(email, "Email");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      if (!validator.email(email)) {
        return "Please enter valid email";
      }
    }
  }

  if (password !== undefined) {
    let emptyValidationText = checkEmpty(password, "Password");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLenghtValidation = checkMinLength(password, 6, "Password");
      if (minLenghtValidation !== "") {
        return minLenghtValidation;
      }
    }
  }

  if (confirmPassword !== undefined) {
    let emptyValidationText = checkEmpty(confirmPassword, "Password");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLenghtValidation = checkMinLength(confirmPassword, 6, "Password");
      if (minLenghtValidation !== "") {
        return minLenghtValidation;
      }
    }
  }
}
