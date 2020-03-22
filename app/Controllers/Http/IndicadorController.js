'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with indicadors
 */
const Indicador = use('App/Models/Indicador')
class IndicadorController {
  /**
   * Show a list of all indicadors.
   * GET indicadors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const indicador = await Indicador.all()
    return indicador
  }



  /**
   * Create/save a new indicador.
   * POST indicadors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.post()
    const indicador = await Indicador.create(data)
    return indicador
  }

  /**
   * Display a single indicador.
   * GET indicadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const indicador = await Indicador.findOrFail(params.id)
    await indicador.load('historicoindicadores')
    await indicador.load('tipoindicador')
    return indicador
  }



  /**
   * Update indicador details.
   * PUT or PATCH indicadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const indicador = await Indicador.findOrFail(params.id)
    indicador.merge(request.post())
    await indicador.save()
    return indicador
  }

  /**
   * Delete a indicador with id.
   * DELETE indicadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const indicador = await Indicador.findOrFail(params.id)
    indicador.delete()
  }
}

module.exports = IndicadorController
