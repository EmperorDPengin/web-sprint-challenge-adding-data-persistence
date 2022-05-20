// build your `/api/tasks` router here
const express = require('express');
const Tasks = require('./model');
const { validateTask } = require('./middleware');
const { handleError } = require('../middleware');

const tasksRouter = express.Router();



tasksRouter.get('/', (req, res, next) => {
    Tasks.getAll()
        .then( tasks => {
            res.status(200).json(tasks);
        })
        .catch(next);
});

tasksRouter.post('/', validateTask, (req, res, next) => {
    Tasks.add(req.body)
        .then( addedTask => {
            res.status(201).json(addedTask);
        })
        .catch(err => {
            next({ status:400, message: err.message});
        })
});

tasksRouter.use(handleError);

module.exports = tasksRouter;