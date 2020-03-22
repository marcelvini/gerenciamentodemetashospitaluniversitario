'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Indicador extends Model {
    meta() {
        return this.belongsTo('App/Models/Meta')
    }
    tipoindicador() {
        return this.belongsTo('App/Models/TipoIndicador')
    }
    historicoindicadores() {
        return this.hasMany('App/Models/HistoricoIndicador')
    }
}

module.exports = Indicador
