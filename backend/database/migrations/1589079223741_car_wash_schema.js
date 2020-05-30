'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarWashSchema extends Schema {
  up () {
    this.create('car_washes', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('address', 254).notNullable()
      table.string('phone', 60).notNullable()
      table.text('prices_list', 60).notNullable()

      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .index()
      table
        .foreign('user_id')
        .references('id')
        .on('users')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('car_washes')
  }
}

module.exports = CarWashSchema
