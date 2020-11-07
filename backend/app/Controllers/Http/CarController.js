'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Car = use('App/Models/Car')
const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with cars
 */
class CarController {
  /**
   * Show a list of all cars.
   * GET cars
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const cars = await Car.query()
      .with('users')
      .fetch()

    return response.json(cars)
  }

  /**
   * Create/save a new car.
   * POST cars
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { ...data } = request.only([
      'model',
      'brand',
      'license_plate',
      'user_id'
    ])
    const user = await User.find(data.user_id)
    if (!user) {
      return response.status(400).json({ error: 'Usuário inexistente' })
    }
    if (user.car_washer) {
      return response.status(400).json({ error: 'Usuário é um lavajato e não pode possuir carros' })
    }

    const car = await Car.create(data)
    await car.load('users')
    return response.json(car)
  }

  /**
   * Display a single car.
   * GET cars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const car = (await Car.query()
      .where('id', params.id)
      .with('users')
      .with('reserves', builder => {
        builder.orderBy('reserve_date', 'desc')
          .with('carWashers')
      })
      .fetch()).toJSON()
    if (!car[0]) {
      return response.status(400).json({ error: 'Carro inexistente' })
    }

    return response.json(car[0])
  }

  /**
   * Update car details.
   * PUT or PATCH cars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const car = await Car.find(params.id)
    if (!car) {
      return response.status(400).json({ error: 'Carro inexistente' })
    }

    const { ...data } = request.only([
      'model',
      'brand',
      'license_plate',
      'user_id'
    ])

    if (data.user_id) {
      const user = await User.find(data.user_id)
      if (!user) {
        return response.status(400).json({ error: 'Usuário inexistente' })
      }
      if (user.car_washer) {
        return response.status(400).json({ error: 'Usuário é um lavajato e não pode possuir carros' })
      }
    }
    await car.merge(data)
    await car.save()
    return response.json(car)
  }

  /**
   * Delete a car with id.
   * DELETE cars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const car = await Car.find(params.id)
    if (!car) {
      return response.status(400).json({ error: 'Carro inexistente' })
    }
    await car.delete()

    return response.json(car)
  }
}

module.exports = CarController
