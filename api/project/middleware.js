const yup = require('yup');

const projectSchema = yup.object().shape({
    project_name: yup  
        .string()
        .trim()
        .typeError('Project Name must be a string')
        .required('Project Name is Required')
        .max(100),
    project_description: yup
        .string()
        .trim()
        .typeError('Description is string only')
        .max(500),
})

function validateProject(req, res, next) {
    projectSchema.validate(req.body,
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
    validateProject
}