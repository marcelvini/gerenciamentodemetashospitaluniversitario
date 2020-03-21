'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CentroDeCusto extends Model {
    metas() {
        return this.hasMany('App/Models/Meta')
    }
}

module.exports = CentroDeCusto
