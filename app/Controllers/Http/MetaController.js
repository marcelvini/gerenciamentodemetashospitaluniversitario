'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with metas
 */
const Meta = use('App/Models/Meta')
class MetaController {
  /**
   * Show a list of all metas.
   * GET metas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const metas = await Meta.all()
    return metas
  }

  /**
   * Create/save a new meta.
   * POST metas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.post()
    const meta = await Meta.create(data)
    return meta
  }


  /**
   * Display a single meta.
   * GET metas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const meta = await Meta.findOrFail(params.id)
    await meta.load('indicadores')
    return meta
  }

  /**
   * Update meta details.
   * PUT or PATCH metas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const meta = await Meta.findOrFail(params.id)
    meta.merge(request.post())
    await meta.save()
    return meta
  }

  /**
   * Delete a meta with id.
   * DELETE metas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const meta = await Meta.findOrFail(params.id)
    meta.delete()
  }
}

module.exports = MetaController
