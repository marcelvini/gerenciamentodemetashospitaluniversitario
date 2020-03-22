'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TipoIndicador extends Model {
    indicadores() {
        return this.hasMany('App/Models/Indicador')
    }
}

module.exports = TipoIndicador
