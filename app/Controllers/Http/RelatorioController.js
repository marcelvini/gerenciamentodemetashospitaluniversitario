'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with relatorios
 */
const Database = use('Database')
class RelatorioController {
  /**
   * Show a list of all relatorios.
   * GET relatorios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async goalsstatus({ request, response, view }) {
    var query = `select m.id as m_id,i.id as i_id,i.tipo_indicador_id, (sum(h.value)/count(h.value)) as mediaindicadoresmeta, ((sum(h.value)/count(h.value))/i.expected_value) *100 as porcentagemdameta from ((centro_de_custos as c inner join metas as m on c.id = m.centro_de_custo_id) inner join indicadors as i on i.meta_id = m.id) inner join historico_indicadors as h on h.indicador_id = i.id where c.id != -1`

    if (request.get().centro) {
      query += ` and c.id = ${request.get().centro}`
    }
    if (request.get().meta) {
      query += ` and m.id = ${request.get().meta}`
    }
    if (request.get().ano) {
      query += ` and m.year = ${request.get().ano}`
    }
    query += ` group by m.id, i.tipo_indicador_id`
    var all = await Database.raw(query)
    if (all.length == 0) {
      response.status(204)
      return
    }
    var i = 1
    var numindicadores = 1
    var m_id = all[0].m_id
    var metaanterior = all[0]
    var totalparcial = all[0].porcentagemdameta
    var totalmetas = []
    var totalgeralmetas = 0
    while (i < (all.length)) {

      if (all[i].m_id == metaanterior.m_id) {
        m_id = all[i].m_id
        totalparcial += all[i].porcentagemdameta
        numindicadores += 1
        if (i == all.length - 1) {
          totalparcial = totalparcial / numindicadores
          totalmetas.push({ totalparcial, m_id })
          numindicadores = 0
        }
      } else {
        totalparcial = totalparcial / numindicadores
        totalmetas.push({ totalparcial, m_id })
        totalparcial = all[i].porcentagemdameta
        numindicadores = 1
        m_id = all[i].m_id
        if (i == all.length - 1) {
          totalmetas.push({ totalparcial, m_id })
        }
      }
      metaanterior = all[i]
      i++
    }
    if (totalmetas.length == 0) {
      totalmetas.push({ totalparcial, m_id })
    }
    for (var meta of totalmetas) {
      totalgeralmetas += meta.totalparcial
    }
    totalgeralmetas = totalgeralmetas / totalmetas.length
    return { all, totalgeralmetas, totalmetas }
  }

  /**
   * Render a form to be used for creating a new relatorio.
   * GET relatorios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new relatorio.
   * POST relatorios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single relatorio.
   * GET relatorios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing relatorio.
   * GET relatorios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update relatorio details.
   * PUT or PATCH relatorios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a relatorio with id.
   * DELETE relatorios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = RelatorioController
