
const Joi=require('joi');

function addTestimonialValidation(user_val)
{
    const schema=Joi.object({

        testimonialName:Joi.string().min(3).max(30).required().messages({
         'string.base': `"testimonialName" should be a type of 'text'`,
         'string.empty': `"testimonialName" cannot be an empty field`,
         'string.min': `"testimonialName" should have a minimum length of 3`,
         'any.required': `"testimonialName" is a required field`
        }),

        designation:Joi.string().min(3).max(30).required().messages({
            'string.base': `"designation" should be a type of 'text'`,
            'string.empty': `"designation" cannot be an empty field`,
            'string.min': `"designation" should have a minimum length of 3`,
            'any.required': `"designation" is a required field`
           }),

         testimonialDescription:Joi.string().min(3).max(30).required().messages({
            'string.base': `"testimonialDescription" should be a type of 'text'`,
            'string.empty': `"testimonialDescription" cannot be an empty field`,
            'string.min': `"testimonialDescription" should have a minimum length of 3`,
            'any.required': `"testimonialDescription" is a required field`
         }),
              
    });
    return schema.validate(user_val);
}


function updateTestimonialValidation(user_val) {
    const schema = Joi.object({
      
        testimonialName:Joi.string().min(3).max(30).required().messages({
            'string.base': `"testimonialName" should be a type of 'text'`,
            'string.empty': `"testimonialName" cannot be an empty field`,
            'string.min': `"testimonialName" should have a minimum length of 3`,
            'any.required': `"testimonialName" is a required field`
           }),
   
           designation:Joi.string().min(3).max(30).required().messages({
               'string.base': `"designation" should be a type of 'text'`,
               'string.empty': `"designation" cannot be an empty field`,
               'string.min': `"designation" should have a minimum length of 3`,
               'any.required': `"designation" is a required field`
              }),
   
            testimonialDescription:Joi.string().min(3).max(30).required().messages({
               'string.base': `"testimonialDescription" should be a type of 'text'`,
               'string.empty': `"testimonialDescription" cannot be an empty field`,
               'string.min': `"testimonialDescription" should have a minimum length of 3`,
               'any.required': `"testimonialDescription" is a required field`
            }),
       });

    return schema.validate(user_val);
  }
  
module.exports = {
    addTestimonialValidation,
    updateTestimonialValidation
  };

  