'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CentroDeCustoSchema extends Schema {
  up() {
    this.create('centros_de_custo', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.integer('leader_user_id').unsigned().references('id').inTable('usuarios')
      table.integer('created_by').unsigned().references('id').inTable('usuarios')
      table.integer('updated_by').unsigned().references('id').inTable('usuarios')
      table.timestamps()
    })
  }

  down() {
    this.drop('centros_de_custo')
  }
}

module.exports = CentroDeCustoSchema
