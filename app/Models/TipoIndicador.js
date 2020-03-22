'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TipoIndicador extends Model {
    indicador() {
        return this.belongsToMany('App/Models/Indicador')
    }
}

module.exports = TipoIndicador
