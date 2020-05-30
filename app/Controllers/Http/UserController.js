const User = use('App/Models/User')

class UserController {
  async index ({ response }) {
    const users = await User.all()
    return response.json(users)
  }

  async store ({ request, response }) {
    const {
      ...data
    } = request.only(['username',
      'cpf',
      'password',
      'phone',
      'address',
      'car_washer'])

    const user = await User.create(data)
    return response.json(user)
  }

  async show ({ response, params }) {
    const user = (await User.query()
      .where('id', params.id)
      .with('cars', builder => {
        builder.with('reserves', build => {
          build.whereNot('status', 'pronto')
        })
      })
      .with('carWashers')
      .fetch()).toJSON()
    if (!user[0]) {
      return response.status(400).json({ error: 'Usuário inexistente' })
    }

    return response.json(user[0])
  }

  async update ({ request, response, params }) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(400).json({ error: 'Usuário inexistente' })
    }

    const {
      ...data
    } = request.only(['username',
      'cpf',
      'password',
      'phone',
      'address',
      'car_washer'])

    await user.merge(data)
    await user.save()

    return response.json(user)
  }

  async destroy ({ params, response }) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(400).json({ error: 'Usuário inexistente' })
    }

    await user.delete()

    return response.json(user)
  }
}

module.exports = UserController
