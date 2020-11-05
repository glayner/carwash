'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Car = use('App/Models/Car')

class MyCarController {
  async show ({ params, request, response, view }) {
    const car = await Car.findByOrFail('user_id', params.id)

    return response.json(car)
  }
}

module.exports = MyCarController
