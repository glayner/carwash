'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Reserve = use('App/Models/Reserve')

class StatusReserveController {
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

    const { status, amount } = request.only([
      'status', 'amount'
    ])

    const statusArray = ['disponível', 'reservado', 'bloqueado', 'esperando', 'lavando', 'finalizado', 'entregue']

    if (!statusArray.includes(status)) {
      return response.status(400).json({ error: `O compo status deve conter um desses valores: ${statusArray}` })
    }

    if (status === 'lavando' && !amount) {
      return response.status(400).json({ error: 'Informe o valor da lavagem' })
    }

    if (status === 'disponível' && reserve.car_id) {
      return response.status(400).json({ error: 'Não é possivel disponibilizar esse horário' })
    }

    const data = { status }
    if (amount) data.amount = amount

    await reserve.merge(data)
    await reserve.save()
    await reserve.loadMany(['cars', 'carWashers'])
    return response.json(reserve)
  }
}

module.exports = StatusReserveController
