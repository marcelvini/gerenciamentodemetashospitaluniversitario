'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HistoricoIndicador extends Model {
    indicador() {
        return this.belongsTo('App/Models/Indicador')
    }
}

module.exports = HistoricoIndicador
