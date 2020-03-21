'use strict'
const Usuario = use('App/Models/Usuario')
class AuthController {
    async signup({ request }) {
        const data = request.only(["name", "email", "password", "role"])
        const usuario = await Usuario.create(data)
        return usuario
    }
    async signin({ request, auth }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        return token
    }
}

module.exports = AuthController
