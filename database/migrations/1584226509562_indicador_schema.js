'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IndicadorSchema extends Schema {
  up() {
    this.create('indicadores', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.integer('meta_id').notNullable().unsigned().references('id').inTable('metas')
      table.integer('created_by').unsigned().references('id').inTable('usuarios')
      table.integer('updated_by').unsigned().references('id').inTable('usuarios')
      table.timestamps()
    })
  }

  down() {
    this.drop('indicadores')
  }
}

module.exports = IndicadorSchema
