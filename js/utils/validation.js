var camelCase, confirmPassVal, confirmValidation, joinValidations, jsonVal, jsonValidation, lenValidation, lengthVal, mailValidation, multiValidations, passVal, passValidation, reqValidation, requiredVal, snakeCase, startCase, titleCase, upperSnakeCase, userVal, validationObject;

startCase = require('lodash.startcase');

camelCase = require('lodash.camelcase');

snakeCase = require('lodash.snakecase');

//: Title Case
titleCase = function(text) {
  return startCase(camelCase(text));
};

//: Upper Snake Case
upperSnakeCase = function(text) {
  return snakeCase(text).toUpperCase();
};

//: Required Field Validation
requiredVal = function(text, field) {
  return multiValidations(text, field, [
    {
      func: reqValidation
    }
  ]);
};

//: Field Length Validation
lengthVal = function(text, length, field) {
  return multiValidations(text, field, [
    {
      func: lenValidation,
      args: {
        length: length
      }
    }
  ]);
};

//: User Validation
userVal = function(text, field) {
  return multiValidations(text, field, [
    {
      func: reqValidation
    },
    {
      func: lenValidation
    },
    {
      func: mailValidation
    }
  ]);
};

//: Password Validation
passVal = function(text, field) {
  return multiValidations(text, field, [
    {
      func: reqValidation
    },
    {
      func: lenValidation
    },
    {
      func: passValidation
    }
  ]);
};

//: Confirm Password Validation
confirmPassVal = function(text, password, field) {
  return multiValidations(text, field, [
    {
      func: reqValidation
    },
    {
      func: confirmValidation,
      args: {
        password: password
      }
    }
  ]);
};

//: JSON Validation
jsonVal = function(text, field) {
  return multiValidations(text, field, [
    {
      func: reqValidation
    },
    {
      func: jsonValidation
    }
  ]);
};

//: Required Validation
reqValidation = function(text, args) {
  if ((text == null) || text.length === 0) {
    return ['is required', 'REQUIRED'];
  } else {
    return true;
  }
};

//: Length Validation
lenValidation = function(text, args) {
  var length;
  length = (args == null) || !args.length ? 8 : args.length;
  if (text.length > 0 && text.length < length) {
    return [`must be at least ${length} characters`, 'INVALID_LENGTH'];
  } else {
    return true;
  }
};

//: Email Validation
mailValidation = function(text, args) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
    return ['must be a valid email address', 'INVALID_EMAIL'];
  } else {
    return true;
  }
};

//: Password Validation
passValidation = function(text, args) {
  if (!RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])").test(text)) {
    return ['must contain at least one numeric, lowercase, uppercase, and special character', 'INVALID_PASSWORD'];
  } else {
    return true;
  }
};

//: Confirm Password Validation
confirmValidation = function(text, args) {
  if ((args == null) || (args.password == null) || text !== args.password) {
    return ['must match password', 'INVALID_CONFIRMATION'];
  } else {
    return true;
  }
};

//: JSON Validation
jsonValidation = function(text, args) {
  var isValid;
  isValid = true;
  try {
    JSON.parse(text);
  } catch (error1) {
    isValid = false;
  }
  if (!isValid) {
    return ['must be a valid JSON object', 'INVALID_JSON'];
  } else {
    return true;
  }
};

//: Validation Object
validationObject = function(text, field, check, args) {
  var error, validObj;
  error = {
    messages: [],
    codes: [],
    valid: true
  };
  validObj = check(text, args);
  if (validObj !== true) {
    error.messages.push(`${titleCase(field)} field ${validObj[0]}.`);
    error.codes.push(`${upperSnakeCase(field)}_${validObj[1]}`);
    error.valid = false;
  }
  return error;
};

//: Multiple Validations
multiValidations = function(text, field, vals) {
  var errors, j, len, val;
  errors = [];
  for (j = 0, len = vals.length; j < len; j++) {
    val = vals[j];
    errors.push(validationObject(text, field, val.func, val.args));
  }
  return joinValidations(errors);
};

//: Join Validations
joinValidations = function(vals) {
  var error, i, j, ref;
  error = {
    messages: [],
    codes: [],
    valid: true
  };
  for (i = j = 0, ref = vals.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
    error.codes = [...error.codes, ...vals[i].codes];
    error.messages = [...error.messages, ...vals[i].messages];
    if (!vals[i].valid) {
      error.valid = false;
    }
  }
  return error;
};

module.exports = {userVal, passVal, confirmPassVal, jsonVal, requiredVal, lengthVal, joinValidations};
