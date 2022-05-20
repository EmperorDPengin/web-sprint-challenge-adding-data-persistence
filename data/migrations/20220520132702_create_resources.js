
exports.up = function(knex) {
    return knex.schema.createTable('resources', tbl => {
        tbl.increments('resource_id').primary();
        tbl.string('resource_name', 120).unique().notNullable();
        tbl.string('resource_description', 500);
    });
  };
  
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('resources');
  };
  