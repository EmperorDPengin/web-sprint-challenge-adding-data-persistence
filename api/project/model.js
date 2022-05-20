// build your `Project` model here
const db = require('../../data/dbConfig.js');

function transformProjectData(project) {
    project.project_completed = project.project_completed ? true : false;
    return project;
}

function getAll() {
    return db('projects').then(projects => projects.map( e => transformProjectData(e)));
}

function getById(id) {
    return db('projects').where('project_id', id).first();
}

async function add(project) {
    const [id] = await db('projects').insert(project);

    return getById(id).then(transformProjectData);
}

module.exports = {
    getAll,
    getById,
    add
}