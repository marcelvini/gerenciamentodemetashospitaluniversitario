'use strict'

const { test, trait, afterEach } = use('Test/Suite')('CostCenter')
const CentroDeCusto = use('App/Models/CentroDeCusto')
const Factory = use('Factory')
const ace = require('@adonisjs/ace')
trait('Test/ApiClient')
trait('Auth/Client')
afterEach(async () => {
    await ace.call('migration:rollback', {}, { silent: true })
    await ace.call('migration:run', {}, { silent: true })
})
test('it should create a new cost center on database', async ({ assert, client, imperium }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const response = await client.post("/costcenter").send({
        name: "TI",
    }).loginVia(usuario, "jwt").end()
    const costcenter = await CentroDeCusto.findBy('name', 'TI')
    response.assertStatus(200)
    assert.exists(costcenter)
})
test('it should update the cost center on database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    await Factory.model('App/Models/CentroDeCusto').create({
        name: "TI"
    })
    const response = await client.put("/costcenter/1").send({
        name: "RH",
    }).loginVia(usuario, "jwt").end()
    const costcenterafterupdate = await CentroDeCusto.findBy('id', 1)
    assert.equal("RH", costcenterafterupdate.name)
    response.assertStatus(200)
    assert.exists(costcenterafterupdate)
})
test('it should return an array countaining all cost centers in database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const costcenters = await Factory.model('App/Models/CentroDeCusto').createMany(3)
    const response = await client.get("/costcenter").send().loginVia(usuario, "jwt").end()


    response.assertStatus(200)
    response.assertJSONSubset([
        { name: costcenters[0].name },
        { name: costcenters[1].name },
        { name: costcenters[2].name }
    ])
})
test('it should show the cost center with id equal to id param on url', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    await Factory.model('App/Models/CentroDeCusto').create({
        name: "TI"
    })
    const response = await client.get("/costcenter/1").send().loginVia(usuario, "jwt").end()
    const costcenter = await CentroDeCusto.findBy('id', 1)
    assert.equal("TI", costcenter.name)
    response.assertStatus(200)
    assert.exists(costcenter)
})
test('it should delete the cost center with id equal to id param on url', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    await Factory.model('App/Models/CentroDeCusto').create({
        name: "TI"
    })
    const response = await client.delete("/costcenter/1").send().loginVia(usuario, "jwt").end()
    const costcenter = await CentroDeCusto.findBy('id', 1)
    response.assertStatus(204)
    assert.notExists(costcenter)
})


