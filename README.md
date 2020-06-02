# Mongoose Auto API - Validations Module
[![Build Status](https://travis-ci.org/edmundpf/mongoose-auto-api-validation.svg?branch=master)](https://travis-ci.org/edmundpf/mongoose-auto-api-validation)
[![npm version](https://badge.fury.io/js/mongoose-auto-api.validation.svg)](https://badge.fury.io/js/mongoose-auto-api.validation)
> Automatic Mongoose REST API - Validations Module ☕

## Install
* `npm i -S mongoose-auto-api.validation`

## Model Setup
* [Model Setup - mongoose-auto-api.info](https://github.com/edmundpf/mongoose-auto-api-info/blob/master/README.md#model-setup)

## Usage
``` javascript
validation = require('mongoose-auto-api.validation')
```

## Methods
* All methods return object
	* messages (Array)
		* list of error messages
	* codes (Array)
		* list of error codes
	* valid (Boolean)
		* returns true if valid input, false otherwise
* **userVal(text, field)**
	* text (String) - text to validate
	* field (String) - field name for error messages/codes generation
	* Assures input is not empty, longer than 8 characters, and is a valid email
* **passVal(text, field)**
	* text (String) - text to validate
	* field (String) - field name for error messages/codes generation
	* Assures input is not empty, longer than 8 characters, and is a valid password with at least one lowercase, capital, numeric, and special character
* **confirmPassVal(text, password, field)**
	* text (String) - text to validate
	* password (String) - confirmation text to check for match
	* field (String) - field name for error messages/codes generation
	* Assures input is not empty, and that input and confirmation password match
* **requiredVal(text, field)**
	* text (String) - text to validate
	* field (String) - field name for error messages/codes generation
	* Assures input is not empty
* **lengthVal(text, field)**
	* text (String) - text to validate
	* field (String) - field name for error messages/codes generation
	* length (Number) - minimum text length
	* Assures input length is greater than or equal to *length*
* **joinValidations(vals)**
	* vals (Array) - list of validation objects
	* returns joined validation object with all messages, and error codes
	* if any validations are false, *valid* will return false
