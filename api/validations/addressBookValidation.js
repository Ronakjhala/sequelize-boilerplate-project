const Joi = require("joi");

function addAddressValidation(user_val) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
      "string.base": `"title" should be a type of 'text'`,
      "string.empty": `"title" cannot be an empty field`,
      "string.min": `"title" should have a minimum length of 3`,
      "any.required": `"title" is a required field`,
    }),

    addressLine1: Joi.string().min(5).max(100).required().messages({
      "string.base": `"addressLine1" should be a type of 'text'`,
      "string.empty": `"addressLine1" cannot be an empty field`,
      "string.min": `"addressLine1" should have a minimum length of 5`,
      "any.required": `"addressLine1" is a required field`,
    }),

    addressLine2: Joi.string().min(5).max(100).required().messages({
      "string.base": `"addressLine2" should be a type of 'text'`,
      "string.empty": `"addressLine2" cannot be an empty field`,
      "string.min": `"addressLine2" should have a minimum length of 5`,
      "any.required": `"addressLine2" is a required field`,
    }),

    country: Joi.string().min(3).max(50).required().messages({
      "string.base": `"country" should be a type of 'text'`,
      "string.empty": `"country" cannot be an empty field`,
      "string.min": `"country" should have a minimum length of 3`,
      "any.required": `"country" is a required field`,
    }),

    state: Joi.string().min(3).max(50).required().messages({
      "string.base": `"state" should be a type of 'text'`,
      "string.empty": `"state" cannot be an empty field`,
      "string.min": `"state" should have a minimum length of 3`,
      "any.required": `"state" is a required field`,
    }),

    city: Joi.string().min(3).max(50).required().messages({
      "string.base": `"city" should be a type of 'text'`,
      "string.empty": `"city" cannot be an empty field`,
      "string.min": `"city" should have a minimum length of 3`,
      "any.required": `"city" is a required field`,
    }),

    pinCode: Joi.string().length(7).required().messages({
      "string.base": `"pinCode" should be a type of 'text'`,
      "string.empty": `"pinCode" cannot be an empty field`,
      "string.length": `"pinCode" should be exactly 7 characters`,
      "any.required": `"pinCode" is a required field`,
    })
  });

  return schema.validate(user_val);
}

function updateAddressValidation(user_val) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
      "string.base": `"title" should be a type of 'text'`,
      "string.empty": `"title" cannot be an empty field`,
      "string.min": `"title" should have a minimum length of 3`,
      "any.required": `"title" is a required field`,
    }),

    addressLine1: Joi.string().min(5).max(100).required().messages({
      "string.base": `"addressLine1" should be a type of 'text'`,
      "string.empty": `"addressLine1" cannot be an empty field`,
      "string.min": `"addressLine1" should have a minimum length of 5`,
      "any.required": `"addressLine1" is a required field`,
    }),

    addressLine2: Joi.string().min(5).max(100).required().messages({
      "string.base": `"addressLine2" should be a type of 'text'`,
      "string.empty": `"addressLine2" cannot be an empty field`,
      "string.min": `"addressLine2" should have a minimum length of 5`,
      "any.required": `"addressLine2" is a required field`,
    }),

    country: Joi.string().min(3).max(50).required().messages({
      "string.base": `"country" should be a type of 'text'`,
      "string.empty": `"country" cannot be an empty field`,
      "string.min": `"country" should have a minimum length of 3`,
      "any.required": `"country" is a required field`,
    }),

    state: Joi.string().min(3).max(50).required().messages({
      "string.base": `"state" should be a type of 'text'`,
      "string.empty": `"state" cannot be an empty field`,
      "string.min": `"state" should have a minimum length of 3`,
      "any.required": `"state" is a required field`,
    }),

    city: Joi.string().min(3).max(50).required().messages({
      "string.base": `"city" should be a type of 'text'`,
      "string.empty": `"city" cannot be an empty field`,
      "string.min": `"city" should have a minimum length of 3`,
      "any.required": `"city" is a required field`,
    }),

    pinCode: Joi.string().length(7).required().messages({
      "string.base": `"pinCode" should be a type of 'text'`,
      "string.empty": `"pinCode" cannot be an empty field`,
      "string.length": `"pinCode" should be exactly 7 characters`,
      "any.required": `"pinCode" is a required field`,
    })
  });

  return schema.validate(user_val);
}


module.exports = {
  addAddressValidation,
  updateAddressValidation
};
