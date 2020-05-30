'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Car extends Model {
  users () {
    return this.belongsTo('App/Models/User', 'user_id', 'id')
  }

  reserves () {
    return this.hasMany('App/Models/Reserve')
  }
}

module.exports = Car
