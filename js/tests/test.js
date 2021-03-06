var assert, should, v;

assert = require('chai').assert;

should = require('chai').should();

v = require('../index');

// Required Validation
describe('Required Validation', function() {
  var val;
  val = v.requiredVal('', 'customer');
  it('Returns object', function() {
    return val.should.be.a('object');
  });
  it('Messages and Codes Length', function() {
    return assert(val.messages.length === val.codes.length);
  });
  it('Required Check', function() {
    return assert(val.codes.includes('CUSTOMER_REQUIRED'));
  });
  return it('Valid Text', function() {
    val = v.requiredVal('test@email.com', 'customer');
    return assert(val.codes.length === 0 && val.messages.length === 0 && val.valid);
  });
});

// Length Validation
describe('Length Validation', function() {
  var val;
  val = v.lengthVal('elmo', 8, 'name');
  it('Returns object', function() {
    return val.should.be.a('object');
  });
  it('Messages and Codes Length', function() {
    return assert(val.messages.length === val.codes.length);
  });
  it('Length Check', function() {
    return assert(val.codes.includes('NAME_INVALID_LENGTH'));
  });
  return it('Valid Text', function() {
    val = v.lengthVal('christopher', 'name');
    return assert(val.codes.length === 0 && val.messages.length === 0 && val.valid);
  });
});

// User Validation
describe('User Validation', function() {
  var val;
  val = v.userVal('', 'username');
  it('Returns object', function() {
    return val.should.be.a('object');
  });
  it('Messages and Codes Length', function() {
    return assert(val.messages.length === val.codes.length);
  });
  it('Required Check', function() {
    return assert(val.codes.includes('USERNAME_REQUIRED'));
  });
  it('Invalid Email Check', function() {
    return assert(val.codes.includes('USERNAME_INVALID_EMAIL'));
  });
  it('Invalid Length Check', function() {
    val = v.userVal('test', 'username');
    return assert(val.codes.includes('USERNAME_INVALID_LENGTH'));
  });
  return it('Valid User', function() {
    val = v.userVal('test@email.com', 'username');
    return assert(val.codes.length === 0 && val.messages.length === 0 && val.valid);
  });
});

// Password Validation
describe('Password Validation', function() {
  var val;
  val = v.passVal('', 'password');
  it('Returns object', function() {
    return val.should.be.a('object');
  });
  it('Messages and Codes Length', function() {
    return assert(val.messages.length === val.codes.length);
  });
  it('Required Check', function() {
    return assert(val.codes.includes('PASSWORD_REQUIRED'));
  });
  it('Invalid Password Check', function() {
    return assert(val.codes.includes('PASSWORD_INVALID_PASSWORD'));
  });
  it('Invalid Length Check', function() {
    val = v.passVal('test', 'password');
    return assert(val.codes.includes('PASSWORD_INVALID_LENGTH'));
  });
  return it('Valid Password', function() {
    val = v.passVal('testPass123!', 'password');
    return assert(val.codes.length === 0 && val.messages.length === 0 && val.valid);
  });
});

// Confirm Password Validation
describe('Confirm Password Validation', function() {
  var val;
  val = v.confirmPassVal('', 'test1', 'confirmPassword');
  it('Returns object', function() {
    return val.should.be.a('object');
  });
  it('Messages and Codes Length', function() {
    return assert(val.messages.length === val.codes.length);
  });
  it('Required Check', function() {
    return assert(val.codes.includes('CONFIRM_PASSWORD_REQUIRED'));
  });
  it('Match Check', function() {
    val = v.confirmPassVal('test', 'test1', 'confirmPassword');
    return assert(val.codes.includes('CONFIRM_PASSWORD_INVALID_CONFIRMATION'));
  });
  return it('Valid Password Confirmation', function() {
    val = v.confirmPassVal('test', 'test', 'confirmPassword');
    return assert(val.codes.length === 0 && val.messages.length === 0 && val.valid);
  });
});

// JSON Validation
describe('JSON Validation', function() {
  var val;
  val = v.jsonVal('', 'jsonField');
  it('Returns object', function() {
    return val.should.be.a('object');
  });
  it('Messages and Codes Length', function() {
    return assert(val.messages.length === val.codes.length);
  });
  it('Required Check', function() {
    return assert(val.codes.includes('JSON_FIELD_REQUIRED'));
  });
  it('Invalid JSON Check', function() {
    return assert(val.codes.includes('JSON_FIELD_INVALID_JSON'));
  });
  return it('Valid JSON', function() {
    val = v.jsonVal('{"a":1,"b":"2","c":[1]}', 'jsonField');
    return assert(val.codes.length === 0 && val.messages.length === 0 && val.valid);
  });
});

// Join Validations
describe('Join Validations', function() {
  var passVal, userVal, val;
  userVal = v.userVal('test', 'username');
  passVal = v.passVal('test', 'password');
  val = v.joinValidations([userVal, passVal]);
  it('Returns object', function() {
    return val.should.be.a('object');
  });
  it('Messages and Codes Length', function() {
    return assert(val.messages.length === val.codes.length && val.codes.length === (userVal.codes.length + passVal.codes.length));
  });
  it('User Validations Check', function() {
    return assert(val.codes.includes('USERNAME_INVALID_EMAIL'));
  });
  it('Password Validations Check', function() {
    return assert(val.codes.includes('USERNAME_INVALID_EMAIL'));
  });
  return it('Valid Join Check', function() {
    userVal = v.userVal('test@email.com', 'username');
    passVal = v.passVal('testPass123!', 'password');
    val = v.joinValidations([userVal, passVal]);
    return assert(val.codes.length === 0 && val.messages.length === 0 && val.valid);
  });
});

//::: End Program :::
