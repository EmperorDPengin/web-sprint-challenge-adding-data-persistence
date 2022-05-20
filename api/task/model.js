// build your `Task` model here
const db = require('../../data/dbConfig.js');

function transformTaskData(task) {
    
    task.task_completed = task.task_completed ? true : false;

    return task;
}

function getAll() {
    return db('tasks as t')
        .leftJoin('projects as p', 'p.project_id', 't.project_id')
        .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description')
        .then(tasks => tasks.map(e => transformTaskData(e)));
}

async function add(task) {
    const [id] = await db('tasks').insert(task);

    return db('tasks').where('task_id', id).first().then(transformTaskData);
} 

module.exports = {
    getAll,
    add
}