'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Indicador extends Model {
    meta() {
        return this.belongsTo('App/Models/Meta')
    }
    tipoindicador() {
        return this.hasOne('App/Models/TipoIndicador')
    }
    historicoindicador() {
        return this.hasmany('App/Models/TipoIndicador')
    }
}

module.exports = Indicador
