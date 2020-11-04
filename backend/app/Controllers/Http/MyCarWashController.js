'use strict'
const CarWash = use('App/Models/CarWash')

class MyCarWashController {
  async show ({ params, request, response, view }) {
    const carwash = await CarWash.findByOrFail('user_id', params.id)

    return response.json(carwash)
  }
}

module.exports = MyCarWashController
