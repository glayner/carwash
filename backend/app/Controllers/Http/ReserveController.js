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
    const { type, carWashId } = request.get()
    let reservesQuery = Reserve.query()
      .with('carWashers')
      .with('cars')

    if (type && type === 'vacant') {
      reservesQuery = reservesQuery.doesntHave('cars')
        .where('reserve_date', '>=', new Date())
        .where('status', 'disponível')
    } else if (type && carWashId && type === 'reserved') {
      reservesQuery = reservesQuery.where('car_wash_id', carWashId)
        .whereHas('cars')
        .orderBy('id', 'desc')
    } else if (type && carWashId && type === 'all') {
      reservesQuery = reservesQuery.where('car_wash_id', carWashId)
        .orderBy('id', 'desc')
    }

    const reserves = await reservesQuery.fetch()
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
      'car_wash_id'
    ])
    const carwash = await CarWash.find(data.car_wash_id)
    if (!carwash) {
      return response.status(400).json({ error: 'Lavajato inexistente' })
    }

    const reserve = await Reserve.create({ ...data, status: 'disponível', amount: 0 })

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
    const { car_id: carId } = request.only([
      'car_id'
    ])

    if (carId) {
      const car = await Car.find(carId)
      if (!car) {
        return response.status(400).json({ error: 'Carro inexistente' })
      }
    }
    await reserve.merge({ car_id: carId, status: 'reservado' })
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
