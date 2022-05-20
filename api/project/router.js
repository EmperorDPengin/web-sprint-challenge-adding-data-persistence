// build your `/api/projects` router here
const express = require('express');
const Projects = require('./model');
const { validateProject } = require('./middleware');
const { handleError } = require('../middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.getAll()
        .then( projects => {
            res.status(200).json(projects);
        })
        .catch(next);
});

router.post('/', validateProject, (req, res, next) => {
    Projects.add(req.body)
        .then( addedProject => {
            res.status(201).json(addedProject);
        })
        .catch(err => {
            next({ status: 400, message: err.message});
        })
});

router.use(handleError);

module.exports = router;