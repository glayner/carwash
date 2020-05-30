const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    const { cpf, password } = request.only(['cpf', 'password'])
    const token = await auth.attempt(cpf, password)
    const user = (
      await User.query()
        .where('cpf', cpf)
        .fetch()
    ).toJSON()[0]
    return response.json({ token, user })
  }
}

module.exports = SessionController
