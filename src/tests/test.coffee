assert = require('chai').assert
should = require('chai').should()
v = require('../index')

# User Validation

describe 'User Validation', ->
	val = v.userVal('', 'username')
	it 'Returns object', ->
		val.should.be.a('object')
	it 'Messages and Codes Length', ->
		assert(val.messages.length == val.codes.length)
	it 'Required Check', ->
		assert(val.codes.includes('USERNAME_REQUIRED'))
	it 'Invalid Email Check', ->
		assert(val.codes.includes('USERNAME_INVALID_EMAIL'))
	it 'Invalid Length Check', ->
		val = v.userVal('test', 'username')
		assert(val.codes.includes('USERNAME_INVALID_LENGTH'))
	it 'Valid User', ->
		val = v.userVal('test@email.com', 'username')
		assert(val.codes.length == 0 and val.messages.length == 0 and val.valid)

# Password Validation

describe 'Password Validation', ->
	val = v.passVal('', 'password')
	it 'Returns object', ->
		val.should.be.a('object')
	it 'Messages and Codes Length', ->
		assert(val.messages.length == val.codes.length)
	it 'Required Check', ->
		assert(val.codes.includes('PASSWORD_REQUIRED'))
	it 'Invalid Password Check', ->
		assert(val.codes.includes('PASSWORD_INVALID_PASSWORD'))
	it 'Invalid Length Check', ->
		val = v.passVal('test', 'password')
		assert(val.codes.includes('PASSWORD_INVALID_LENGTH'))
	it 'Valid Password', ->
		val = v.passVal('testPass123!', 'password')
		assert(val.codes.length == 0 and val.messages.length == 0 and val.valid)

# Confirm Password Validation

describe 'Confirm Password Validation', ->
	val = v.confirmPassVal('', 'test1', 'confirmPassword')
	it 'Returns object', ->
		val.should.be.a('object')
	it 'Messages and Codes Length', ->
		assert(val.messages.length == val.codes.length)
	it 'Required Check', ->
		assert(val.codes.includes('CONFIRM_PASSWORD_REQUIRED'))
	it 'Match Check', ->
		val = v.confirmPassVal('test', 'test1', 'confirmPassword')
		assert(val.codes.includes('CONFIRM_PASSWORD_INVALID_CONFIRMATION'))
	it 'Valid Password Confirmation', ->
		val = v.confirmPassVal('test', 'test', 'confirmPassword')
		assert(val.codes.length == 0 and val.messages.length == 0 and val.valid)

# Join Validations

describe 'Join Validations', ->
	userVal = v.userVal('test', 'username')
	passVal = v.passVal('test', 'password')
	val = v.joinValidations([ userVal, passVal ])
	it 'Returns object', ->
		val.should.be.a('object')
	it 'Messages and Codes Length', ->
		assert(val.messages.length == val.codes.length and
			val.codes.length == (userVal.codes.length + passVal.codes.length))
	it 'User Validations Check', ->
		assert(val.codes.includes('USERNAME_INVALID_EMAIL'))
	it 'Password Validations Check', ->
		assert(val.codes.includes('USERNAME_INVALID_EMAIL'))
	it 'Valid Join Check', ->
		userVal = v.userVal('test@email.com', 'username')
		passVal = v.passVal('testPass123!', 'password')
		val = v.joinValidations([ userVal, passVal ])
		assert(val.codes.length == 0 and val.messages.length == 0 and val.valid)

#::: End Program :::