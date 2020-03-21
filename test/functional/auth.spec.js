'use strict'

const { test, trait, afterEach } = use('Test/Suite')('Auth')
const Usuario = use('App/Models/Usuario')
const Factory = use('Factory')
const ace = require('@adonisjs/ace')
trait('Test/ApiClient')
afterEach(async () => {
    await ace.call('migration:rollback', {}, { silent: true })
    await ace.call('migration:run', {}, { silent: true })
})
test('it should create a new user on database', async ({ assert, client }) => {
    const response = await client.post("/signup").send({
        email: "marcel@gmail.com",
        password: "123",
        name: "marcel",
        role: "admin"
    }).end()
    const usuario = await Usuario.findBy('email', 'marcel@gmail.com')
    response.assertStatus(200)
    assert.exists(usuario)
})

test('it should return Jwt Token when authenticated', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const response = await client.post("/signin").send(credentials).end()
    response.assertStatus(200)
    assert.exists(response.body.token)
})
