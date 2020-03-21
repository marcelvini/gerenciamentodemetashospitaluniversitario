'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with historicoindicadors
 */
const HistoricoIndicador = use('App/Models/HistoricoIndicador')
class HistoricoIndicadorController {
  /**
   * Show a list of all historicoindicadors.
   * GET historicoindicadors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const historicoIndicador = await HistoricoIndicador.all()
    return historicoIndicador
  }

  /**
   * Create/save a new historicoindicador.
   * POST historicoindicadors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.post()
    const historicoIndicador = await HistoricoIndicador.create(data)
    return historicoIndicador
  }


  /**
   * Display a single historicoindicador.
   * GET historicoindicadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const historicoIndicador = await HistoricoIndicador.findOrFail(params.id)
    return historicoIndicador
  }

  /**
   * Update historicoindicador details.
   * PUT or PATCH historicoindicadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const historicoIndicador = await HistoricoIndicador.findOrFail(params.id)
    historicoIndicador.merge(request.post())
    await historicoIndicador.save()
    return historicoIndicador
  }

  /**
   * Delete a historicoindicador with id.
   * DELETE historicoindicadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const historicoIndicador = await HistoricoIndicador.findOrFail(params.id)
    historicoIndicador.delete()

  }
}

module.exports = HistoricoIndicadorController
