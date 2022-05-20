const Projects = require('../project/model');
const yup = require('yup');

const taskSchema = yup.object().shape({
    task_description: yup
        .string()
        .trim()
        .typeError('Task Description must be a string')
        .required('Task Description is Required')
        .max(500),
    project_id: yup
        .number()
        .typeError('Project ID must be a number')
        .required('Proejct ID is Required'),
})


function validateTask(req, res, next) {
    taskSchema.validate(req.body,
        {
            strict: true,
            stripUnknown: true
        })
        .then( validated => {
            Projects.getById(validated.project_id)
                .then( projectByID => {
                    if (projectByID) {
                        req.body = validated;
                        next();
                    } else {
                        next( err => {
                           next({ status: 404, message: 'Project ID no found'})     
                        })
                    }
                })
                .catch(next)
        })
        .catch(err => {
            next({ status: 400, message: err.message});
        })
}


module.exports = {
    validateTask,
}