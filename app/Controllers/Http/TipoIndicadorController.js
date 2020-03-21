'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tipoindicadors
 */
const TipoIndicador = use('App/Models/TipoIndicador')
class TipoIndicadorController {
  /**
   * Show a list of all tipoindicadors.
   * GET tipoindicadors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const tipo = await TipoIndicador.all()
    return tipo
  }

  /**
   * Create/save a new tipoindicador.
   * POST tipoindicadors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.post()
    const tipo = await TipoIndicador.create(data)
    return tipo
  }

  /**
   * Display a single tipoindicador.
   * GET tipoindicadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const tipo = await TipoIndicador.findOrFail(params.id)
    return tipo
  }



  /**
   * Update tipoindicador details.
   * PUT or PATCH tipoindicadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const tipo = await TipoIndicador.findOrFail(params.id)
    tipo.merge(request.post())
    await tipo.save()
    return tipo
  }

  /**
   * Delete a tipoindicador with id.
   * DELETE tipoindicadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const tipo = await TipoIndicador.findOrFail(params.id)
    tipo.delete()
  }
}

module.exports = TipoIndicadorController
