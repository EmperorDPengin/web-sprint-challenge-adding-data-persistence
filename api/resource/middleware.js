const yup = require('yup');

const resourceSchema = yup.object().shape({
    resource_name: yup  
        .string()
        .trim()
        .typeError('Resource Name must be a string')
        .required('resours Name is Required')
        .max(100),
    resource_description: yup
        .string()
        .trim()
        .max(500),
})

function validateResource(req, res, next) {
    resourceSchema.validate(req.body,
        {
            strict: true,
            stripUnknown: true
        })
        .then( validated => {
            req.body = validated;
            next();
        })
        .catch(err => {
            next({ status: 400, message: err.message});
        })
}


module.exports = {
    validateResource
}