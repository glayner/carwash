'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Reserve = use('App/Models/Reserve')
const CarWash = use('App/Models/CarWash')
const Car = use('App/Models/Car')
/**
 * Resourceful controller for interacting with reserves
 */
class ReserveController {
  /**
   * Show a list of all reserves.
   * GET reserves
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const reserves = await Reserve.query()
      .with('carWashers')
      .with('cars')
      .fetch()
    return response.json(reserves)
  }

  /**
   * Create/save a new reserve.
   * POST reserves
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { ...data } = request.only([
      'reserve_date',
      'status',
      'amount',
      'car_wash_id'
    ])
    const carwash = await CarWash.find(data.car_wash_id)
    if (!carwash) {
      return response.status(400).json({ error: 'Lavajato inexistente' })
    }
    const reserve = await Reserve.create(data)
    await reserve.load('carWashers')
    return response.json(reserve)
  }

  /**
   * Display a single reserve.
   * GET reserves/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const reserve = await Reserve.find(params.id)
    if (!reserve) {
      return response.status(400).json({ error: 'Reserva inexistente' })
    }
    await reserve.loadMany(['cars', 'carWashers'])
    return response.json(reserve)
  }

  /**
   * Update reserve details.
   * PUT or PATCH reserves/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const reserve = await Reserve.find(params.id)
    if (!reserve) {
      return response.status(400).json({ error: 'Reserva inexistente' })
    }
    const { ...data } = request.only([
      'reserve_date',
      'status',
      'amount',
      'car_wash_id',
      'car_id'
    ])
    if (data.car_wash_id) {
      const carwash = await CarWash.find(data.car_wash_id)
      if (!carwash) {
        return response.status(400).json({ error: 'Lavajato inexistente' })
      }
    }
    if (data.car_id) {
      const car = await Car.find(data.car_id)
      if (!car) {
        return response.status(400).json({ error: 'Carro inexistente' })
      }
    }
    await reserve.merge(data)
    await reserve.save()
    await reserve.loadMany(['cars', 'carWashers'])
    return response.json(reserve)
  }

  /**
   * Delete a reserve with id.
   * DELETE reserves/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const reserve = await Reserve.find(params.id)
    if (!reserve) {
      return response.status(400).json({ error: 'Reserva inexistente' })
    }
    await reserve.delete()

    return response.json(reserve)
  }
}

module.exports = ReserveController
