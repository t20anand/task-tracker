const Joi = require('joi');

const PriorityRequestSchema = Joi.object({
    title: Joi.string().min(8).max(10).required(),
    rank: Joi.number().required(),
});

const validationOptions = { abortEarly: false };

const PriorityRequestValidator = (req, res, next) => {
    // PriorityRequestSchema.validateAsync(req.body, validationOptions)
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.log('err')
    //         console.log(err)
    //     });


    // next(error);

}

module.exports = PriorityRequestValidator;


