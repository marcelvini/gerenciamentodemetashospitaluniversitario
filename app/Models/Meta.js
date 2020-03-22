'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meta extends Model {
    centrodecusto() {
        return this.hasOne('App/Models/CentroDeCusto')
    }
    indicadores() {
        return this.hasMany('App/Models/Indicadores')
    }
}

module.exports = Meta
