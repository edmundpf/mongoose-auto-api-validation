startCase = require('lodash.startcase')
camelCase = require('lodash.camelcase')
snakeCase = require('lodash.snakecase')

#: Title Case

titleCase = (text) ->
	return startCase(camelCase(text))

#: Upper Snake Case

upperSnakeCase = (text) ->
	return snakeCase(text).toUpperCase()

#: User Validation

userVal = (text, field) ->
	return multiValidations(
		text,
		field,
		[
			{
				func: reqValidation
			}
			{
				func: lenValidation
			}
			{
				func: mailValidation
			}
		]
	)

#: Password Validation

passVal = (text, field) ->
	return multiValidations(
		text,
		field,
		[
			{
				func: reqValidation
			}
			{
				func: lenValidation
			}
			{
				func: passValidation
			}
		]
	)

#: Confirm Password Validation

confirmPassVal = (text, password, field) ->
	return multiValidations(
		text,
		field,
		[
			{
				func: confirmValidation
				args:
					password: password
			}
		]
	)

#: JSON Validation

jsonVal = (text, field) ->
	return multiValidations(
		text,
		field,
		[
			{
				func: reqValidation
			}
			{
				func: jsonValidation
			}
		]
	)

#: Required Validation

reqValidation = (text, args) ->
	if !text? or text.length == 0
		return [
			'is required',
			'REQUIRED'
		]
	else
		return true

#: Length Validation

lenValidation = (text, args) ->
	length = if !args? || !args.length then 8 else args.length
	if text.length > 0 and text.length < length
		return [
			"must be at least #{length} characters"
			'INVALID_LENGTH'
		]
	else
		return true

#: Email Validation

mailValidation = (text, args) ->
	if !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)
		return [
			'must be a valid email address'
			'INVALID_EMAIL'
		]
	else
		return true

#: Password Validation

passValidation = (text, args) ->
	if !RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])").test(text)
		return [
			'must contain at least one numeric, lowercase, uppercase, and special character'
			'INVALID_PASSWORD'
		]
	else
		return true

#: Confirm Password Validation

confirmValidation = (text, args) ->
	if !args? or !args.password? or text != args.password
		return [
			'must match password'
			'INVALID_CONFIRMATION'
		]
	else
		return true

#: JSON Validation

jsonValidation = (text, args) ->
	isValid = true
	try
		JSON.parse(text)
	catch
		isValid = false
	if !isValid
		return [
			'must be a valid JSON object'
			'INVALID_JSON'
		]
	else
		return true

#: Validation Object

validationObject = (text, field, check, args) ->
	error =
		messages: []
		codes: []
		valid: true
	validObj = check(text, args)
	if validObj != true
		error.messages.push("#{titleCase(field)} field #{validObj[0]}.")
		error.codes.push("#{upperSnakeCase(field)}_#{validObj[1]}")
		error.valid = false
	return error

#: Multiple Validations

multiValidations = (text, field, vals) ->
	errors = []
	for val in vals
		errors.push(
			validationObject(
				text,
				field,
				val.func,
				val.args
			)
		)
	return joinValidations(errors)

#: Join Validations

joinValidations = (vals) ->
	error =
		messages: []
		codes: []
		valid: true
	for i in [0...vals.length]
		error.codes = [
			...error.codes,
			...vals[i].codes
		]
		error.messages = [
			...error.messages,
			...vals[i].messages
		]
		if !vals[i].valid
			error.valid = false
	return error

module.exports = {
	userVal,
	passVal,
	confirmPassVal,
	jsonVal,
	joinValidations,
}