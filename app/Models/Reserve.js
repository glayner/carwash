'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reserve extends Model {
  carWashers () {
    return this.belongsTo('App/Models/CarWash', 'car_wash_id', 'id')
  }

  cars () {
    return this.belongsTo('App/Models/Car', 'car_id', 'id')
  }
}

module.exports = Reserve
