exports.up = function(knex) {
    return knex.schema.createTable('tasks', tbl => {
        tbl.increments('task_id').primary();
        tbl.string('task_description').notNullable();
        tbl.string('task_notes', 500);
        tbl.integer('task_completed').defaultTo(0);
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    });
  };
  
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('tasks');
  };