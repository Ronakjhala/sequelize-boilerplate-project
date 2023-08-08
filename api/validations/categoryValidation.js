
const Joi=require('joi');

function CategoryValidation(user_val)
{
    const schema=Joi.object({

        categoryName:Joi.string().min(3).max(30).required().messages({
         'string.base': `"categoryname" should be a type of 'text'`,
         'string.empty': `"categoryname" cannot be an empty field`,
         'string.min': `"categoryname" should have a minimum length of 3`,
         'any.required': `"categoryname" is a required field`
        }),

        categoryType:Joi.string().min(3).max(30).required().messages({
            'string.base': `"categorytype" should be a type of 'text'`,
            'string.empty': `"categorytype" cannot be an empty field`,
            'string.min': `"categorytype" should have a minimum length of 3`,
            'any.required': `"categorytype" is a required field`
           }),
        
              
    });
    return schema.validate(user_val);
}
module.exports = {
    CategoryValidation
  };
  
