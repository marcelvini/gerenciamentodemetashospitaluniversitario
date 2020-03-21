'use strict'

const { test, trait, afterEach } = use('Test/Suite')('Indicator Type')
const TipoIndicador = use('App/Models/TipoIndicador')
const Factory = use('Factory')
const ace = require('@adonisjs/ace')

trait('Test/ApiClient')
trait('Auth/Client')

afterEach(async () => {
    await ace.call('migration:rollback', {}, { silent: true })
    await ace.call('migration:run', {}, { silent: true })
})
test('it should create a new indicator type on database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const response = await client.post("/indicatortype").send({
        frequency: "mensal",
        value_type: "porcentagem",
    }).loginVia(usuario, "jwt").end()
    const indicatorType = await TipoIndicador.findBy('id', 1)
    response.assertStatus(200)
    assert.exists(indicatorType)
})
test('it should return an array countaining all indicator types in database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const indicatorTypes = await Factory.model('App/Models/TipoIndicador').createMany(3)
    const response = await client.get("/indicatortype").send().loginVia(usuario, "jwt").end()


    response.assertStatus(200)
    response.assertJSONSubset([
        { id: indicatorTypes[0].id },
        { id: indicatorTypes[1].id },
        { id: indicatorTypes[2].id }
    ])
})
test('it should show the indicator type with id equal to id param on url', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    await Factory.model('App/Models/TipoIndicador').create()
    const response = await client.get("/indicatortype/1").send().loginVia(usuario, "jwt").end()
    const indicatorType = await TipoIndicador.findBy('id', 1)
    response.assertStatus(200)
    assert.exists(indicatorType)
})
test('it should delete the indicator type with id equal to id param on url', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    await Factory.model('App/Models/TipoIndicador').create()
    const response = await client.delete("/indicatortype/1").send().loginVia(usuario, "jwt").end()
    const indicatorType = await TipoIndicador.findBy('id', 1)
    response.assertStatus(204)
    assert.notExists(indicatorType)
})


