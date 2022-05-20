
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments('project_id').primary();
    tbl.string('project_name', 120).notNullable();
    tbl.string('project_description', 500);
    tbl.integer('project_completed').defaultTo(0);
  });
};


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('projects');
};
