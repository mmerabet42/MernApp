const joi = require('@hapi/joi');

module.exports = (validator, data) => {

    const validators = {
        "registration": joi.object().keys({
            username: joi.string().min(4).required(),
            password: joi.string().min(6).required()
        })
    };
    
    const validatorObject = validators[validator];
    if (!validatorObject)
        return null;

    return validatorObject.validate(data);
};