// build your server here and require it from index.js
const express = require('express');
const helmet = require('helmet');


const projectsRouter = require('./project/router');
const resourcesRouter = require('./resource/router');
//task router

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);

server.use('*', (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    });
});

module.exports = server;
