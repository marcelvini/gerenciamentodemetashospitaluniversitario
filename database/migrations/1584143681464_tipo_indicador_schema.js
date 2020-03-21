'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoIndicadorSchema extends Schema {
  up() {
    this.create('tipo_indicadors', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('frequency', 80).notNullable()
      table.string('value_type', 80).notNullable()
      table.integer('created_by').unsigned().references('id').inTable('usuarios')
      table.integer('updated_by').unsigned().references('id').inTable('usuarios')
      table.timestamps()
    })
  }

  down() {
    this.drop('tipo_indicadors')
  }
}

module.exports = TipoIndicadorSchema
