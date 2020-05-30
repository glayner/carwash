'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReserveSchema extends Schema {
  up () {
    this.create('reserves', (table) => {
      table.increments()
      table.timestamp('reserve_date').notNullable()
      table.string('status', 60).notNullable()
      table.decimal('amount', 10, 2)
      table
        .integer('car_wash_id')
        .notNullable()
        .unsigned()
        .index()
      table
        .foreign('car_wash_id')
        .references('id')
        .on('car_washes')
        .onDelete('cascade')
        .onUpdate('cascade')
      table
        .integer('car_id')
        .unsigned()
        .index()
      table
        .foreign('car_id')
        .references('id')
        .on('cars')
        .onDelete('SET NULL')
        .onUpdate('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('reserves')
  }
}

module.exports = ReserveSchema
