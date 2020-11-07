'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const CarWash = use('App/Models/CarWash')
const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with carwashes
 */
class CarWashController {
  /**
   * Show a list of all carwashes.
   * GET carwashes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { address } = request.get()
    let carwash
    if (address) {
      carwash = await CarWash.query()
        .whereRaw(`address like '%${address}%'`)
        .with('reserves', builder => {
          builder.where('status', 'disponivel')
            .where('reserve_date', '>', new Date())
        })
        .fetch()
    } else {
      carwash = await CarWash.query()
        .with('reserves', builder => {
          builder.where('status', 'disponivel')
            .where('reserve_date', '>', new Date())
        })
        .fetch()
    }

    return response.json(carwash)
  }

  /**
   * Create/save a new carwash.
   * POST carwashes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { ...data } = request.only([
      'name',
      'address',
      'phone',
      'prices_list',
      'user_id'
    ])
    const user = await User.find(data.user_id)
    if (!user) {
      return response.status(400).json({ error: 'Usuário inexistente' })
    }
    if (!user.car_washer) {
      return response.status(400).json({ error: 'Usuário não pode ser cadastrado para lavajato' })
    }
    const carwash = await CarWash.create(data)
    await carwash.load('users')
    return response.json(carwash)
  }

  /**
   * Display a single carwash.
   * GET carwashes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const { status } = request.get()
    let carwash
    if (status) {
      carwash = (await CarWash.query()
        .where('id', params.id)
        .with('reserves', builder => {
          builder.orderBy('id', 'desc')
            .where('status', status)
            .with('cars', build => {
              build.with('users')
            })
        })
        .fetch()).toJSON()
    } else {
      carwash = (await CarWash.query()
        .where('id', params.id)
        .with('reserves', builder => {
          builder.orderBy('id', 'desc')
            .with('cars', build => {
              build.with('users')
            })
        })
        .fetch()).toJSON()
    }
    if (!carwash[0]) {
      return response.status(400).json({ error: 'lavajato inexistente' })
    }

    return response.json(carwash[0])
  }

  /**
   * Update carwash details.
   * PUT or PATCH carwashes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const carwash = await CarWash.find(params.id)
    if (!carwash) {
      return response.status(400).json({ error: 'lavajato inexistente' })
    }
    const { ...data } = request.only([
      'name',
      'address',
      'phone',
      'prices_list',
      'user_id'
    ])
    if (data.user_id) {
      const user = await User.find(data.user_id)
      if (!user) {
        return response.status(400).json({ error: 'Usuário inexistente' })
      }
      if (!user.car_washer) {
        return response.status(400).json({ error: 'Usuário não pode ser cadastrado para lavajato' })
      }
    }
    await carwash.merge(data)
    await carwash.save()
    return response.json(carwash)
  }

  /**
   * Delete a carwash with id.
   * DELETE carwashes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const carwash = await CarWash.find(params.id)
    if (!carwash) {
      return response.status(400).json({ error: 'lavajato inexistente' })
    }
    await carwash.delete()

    return response.json(carwash)
  }
}

module.exports = CarWashController
