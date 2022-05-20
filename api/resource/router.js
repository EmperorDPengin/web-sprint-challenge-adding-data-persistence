// build your `/api/resources` router here
const express = require('express');
const Resources = require('./model');
const { validateResource } = require('./middleware');
const { handleError } = require('../middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Resources.getAll()
        .then( projects => {
            res.status(200).json(projects);
        })
        .catch(next);
});

router.post('/',validateResource, (req, res, next) => {
    Resources.add(req.body)
        .then( addedResource => {
            res.status(201).json(addedResource);
        })
        .catch(err => {
            next({ status: 400, message: err.message});
        })
});

router.use(handleError);

module.exports = router;