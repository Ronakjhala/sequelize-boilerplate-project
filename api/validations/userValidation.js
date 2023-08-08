const Joi = require("joi");

function registrationValidation(user_val) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required().messages({
      "string.base": `"firstName" should be a type of 'text'`,
      "string.empty": `"firstName" cannot be an empty field`,
      "string.min": `"firstName" should have a minimum length of 3`,
      "any.required": `"firstName" is a required field`,
    }),

    lastName: Joi.string().min(3).max(30).required().messages({
      "string.base": `"lastName" should be a type of 'text'`,
      "string.empty": `"lastName" cannot be an empty field`,
      "string.min": `"lastName" should have a minimum length of 3`,
      "any.required": `"lastName" is a required field`,
    }),

    email: Joi.string().min(11).max(50).required().email().messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `"email" is a required field`,
    }),

    gender: Joi.string().required().messages({
      "any.required": `"gender" is a required field`,
    }),

    password: Joi.string().min(8).max(15).required().messages({
      "string.base": `"password" should contain at least 1 uppercase,1 lowercase,1 digit'`,
      "string.empty": `"password" cannot be an empty field`,
      "string.min": `"password" should have a minimum length of 8 `,
      "any.required": `"password" is a required field`,
    }),

  });
  return schema.validate(user_val);
}

function updateValidation(user_val) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required().messages({
      "string.base": `"firstName" should be a type of 'text'`,
      "string.empty": `"firstName" cannot be an empty field`,
      "string.min": `"firstName" should have a minimum length of 3`,
      "any.required": `"firstName" is a required field`,
    }),

    lastName: Joi.string().min(3).max(30).required().messages({
      "string.base": `"lastName" should be a type of 'text'`,
      "string.empty": `"lastName" cannot be an empty field`,
      "string.min": `"lastName" should have a minimum length of 3`,
      "any.required": `"lastName" is a required field`,
    }),

    email: Joi.string().min(11).max(50).required().email().messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `"email" is a required field`,
    }),

    gender: Joi.string().required().messages({
      "any.required": `"gender" is a required field`,
    }),

    mobile: Joi.string().length(10).required().messages({
      "any.required": `"mobile" is a required field`,
      "string.empty": `"mobile" cannot be an empty field`,
      "string.length": `"mobile" should have a length of 10 characters`,
    }),
  });
  return schema.validate(user_val);
}

function loginValidation(user_val) {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `"email" is a required field`,
    }),
    password: Joi.string().required().messages({
      "string.base": `"password" should contain at least 1 uppercase,1 lowercase,1 digit'`,
      "string.empty": `"password" cannot be an empty field`,
    }),
  });
  return schema.validate(user_val);
}

function newPasswordValidation(user_val) {
  const schema = Joi.object({
    email: Joi.string().min(11).max(50).required().email().messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `"email" is a required field`,
    }),
    newPassword: Joi.string().min(8).max(250).required().messages({
      "string.base": `"newPassword" should contain at least 1 uppercase,1 lowercase,1 digit'`,
      "string.empty": `"newPassword" cannot be an empty field`,
      "string.min": `"newPassword" should have a minimum length of 8 `,
      "any.required": `"newPassword" is a required field`,
    }),
    confirmPassword: Joi.any()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "string.base": `"confirm password" and password should be same'`,
      }),

  });
  return schema.validate(user_val);
}

function resetPasswordValidation(user_val) {
  const schema = Joi.object({
    email: Joi.string().min(11).max(50).required().email().messages({
      "string.empty": `"email" cannot be an empty field`,
      "any.required": `"email" is a required field`,
    }),
    oldPassword: Joi.string().min(8).max(250).required().messages({
      "string.base": `"oldPassword" should contain at least 1 uppercase,1 lowercase,1 digit'`,
      "string.empty": `"oldPassword" cannot be an empty field`,
      "string.min": `"oldPassword" should have a minimum length of 8 `,
      "any.required": `"oldPassword" is a required field`,
    }),
    newPassword: Joi.string().min(8).max(250).required().messages({
      "string.base": `"newPassword" should contain at least 1 uppercase,1 lowercase,1 digit'`,
      "string.empty": `"newPassword" cannot be an empty field`,
      "string.min": `"newPassword" should have a minimum length of 8 `,
      "any.required": `"newPassword" is a required field`,
    }),
    confirmPassword: Joi.any()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "string.base": `"confirm password" and password should be same'`,
      }),

  });
  return schema.validate(user_val);
}

module.exports = {
  registrationValidation,
  updateValidation,
  resetPasswordValidation,
  loginValidation,
  newPasswordValidation,
};
