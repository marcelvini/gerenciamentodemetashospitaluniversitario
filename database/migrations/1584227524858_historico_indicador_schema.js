'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistoricoIndicadorSchema extends Schema {
  up() {
    this.create('historico_indicadors', (table) => {
      table.increments()
      table.float('value').notNullable()
      table.integer('indicador_id').notNullable().unsigned().references('id').inTable('indicadors')
      table.integer('created_by').unsigned().references('id').inTable('usuarios')
      table.integer('updated_by').unsigned().references('id').inTable('usuarios')
      table.timestamps()
    })
  }

  down() {
    this.drop('historico_indicadors')
  }
}

module.exports = HistoricoIndicadorSchema
