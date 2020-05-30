'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarsSchema extends Schema {
  up () {
    this.create('cars', (table) => {
      table.increments()
      table.string('model', 60)
      table.string('brand', 60)
      table.string('license_plate', 60).notNullable().unique()
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
    this.drop('cars')
  }
}

module.exports = CarsSchema
