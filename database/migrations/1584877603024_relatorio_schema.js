'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RelatorioSchema extends Schema {
  up () {
    this.create('relatorios', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('relatorios')
  }
}

module.exports = RelatorioSchema
