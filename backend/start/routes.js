'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store')

Route.post('sessions', 'SessionController.store')

Route.group(() => {
  Route.resource('users', 'UserController')
    .apiOnly()
    .except(['store'])

  Route.resource('cars', 'CarController').apiOnly()

  Route.resource('carwashes', 'CarWashController').apiOnly()

  Route.resource('reserves', 'ReserveController').apiOnly()

  Route.resource('status', 'StatusReserveController').apiOnly()

  Route.resource('mycarwashes', 'MyCarWashController').apiOnly()
}).middleware(['auth'])
