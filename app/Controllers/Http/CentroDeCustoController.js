'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with centrodecustos
 */
const CentroDeCusto = use('App/Models/CentroDeCusto')
class CentroDeCustoController {
  /**
   * Show a list of all centrodecustos.
   * GET centrodecustos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const centrosDeCusto = await CentroDeCusto.all()
    return centrosDeCusto
  }

  /**
   * Create/save a new centrodecusto.
   * POST centrodecustos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.post()
    const centroDeCusto = await CentroDeCusto.create(data)
    return centroDeCusto
  }

  /**
   * Display a single centrodecusto.
   * GET centrodecustos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const centroDeCusto = await CentroDeCusto.findOrFail(params.id)
    return centroDeCusto
  }

  /**
   * Update centrodecusto details.
   * PUT or PATCH centrodecustos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const centroDeCusto = await CentroDeCusto.findOrFail(params.id)
    centroDeCusto.fill(request.post())
    await centroDeCusto.save()
    return centroDeCusto
  }

  /**
   * Delete a centrodecusto with id.
   * DELETE centrodecustos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const centroDeCusto = await CentroDeCusto.findOrFail(params.id)
    centroDeCusto.delete()
  }
}

module.exports = CentroDeCustoController
