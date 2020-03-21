'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MetaSchema extends Schema {
  up() {
    this.create('metas', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.integer('year').notNullable()
      table.integer('centro_de_custos_id').notNullable().unsigned().references('id').inTable('centro_de_custos')
      table.integer('created_by').unsigned().references('id').inTable('usuarios')
      table.integer('updated_by').unsigned().references('id').inTable('usuarios')
      table.timestamps()
    })
  }

  down() {
    this.drop('metas')
  }
}

module.exports = MetaSchema
