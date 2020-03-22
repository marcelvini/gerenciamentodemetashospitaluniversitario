'use strict'

const { test, trait, afterEach } = use('Test/Suite')('Goal')
const Meta = use('App/Models/Meta')
const Factory = use('Factory')
const ace = require('@adonisjs/ace')

trait('Test/ApiClient')
trait('Auth/Client')

afterEach(async () => {
    await ace.call('migration:rollback', {}, { silent: true })
    await ace.call('migration:run', {}, { silent: true })
})
test('it should create a new goal on database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const costcenter = await Factory.model('App/Models/CentroDeCusto').create()
    const response = await client.post("/goal").send({
        name: "Meta A",
        year: 2020,
        centro_de_custo_id: costcenter.id,
    }).loginVia(usuario, "jwt").end()
    const goal = await Meta.findBy('name', 'Meta A')
    response.assertStatus(200)
    assert.exists(goal)
})
test('it should update the goal on database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const costcenter = await Factory.model('App/Models/CentroDeCusto').create()
    await Factory.model('App/Models/Meta').create({
        name: "Meta A",
        year: 2020,
        centro_de_custo_id: costcenter.id,
    })
    const response = await client.put("/goal/1").send({
        name: "Meta B",
    }).loginVia(usuario, "jwt").end()
    const goalafterupdate = await Meta.findBy('id', 1)
    assert.equal("Meta B", goalafterupdate.name)
    response.assertStatus(200)
    assert.exists(goalafterupdate)
})
test('it should return an array countaining all goals in database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const goals = await Factory.model('App/Models/Meta').createMany(3)
    const response = await client.get("/goal").send().loginVia(usuario, "jwt").end()


    response.assertStatus(200)
    response.assertJSONSubset([
        { name: goals[0].name },
        { name: goals[1].name },
        { name: goals[2].name }
    ])
})
test('it should show the goal with id equal to id param on url', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const costcenter = await Factory.model('App/Models/CentroDeCusto').create()
    await Factory.model('App/Models/Meta').create({
        name: "Meta A",
        year: 2020,
        centro_de_custo_id: costcenter.id,
    })
    const response = await client.get("/costcenter/1").send().loginVia(usuario, "jwt").end()
    const goal = await Meta.findBy('id', 1)
    assert.equal("Meta A", goal.name)
    response.assertStatus(200)
    assert.exists(goal)
})
test('it should delete the goal with id equal to id param on url', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const costcenter = await Factory.model('App/Models/CentroDeCusto').create()
    await Factory.model('App/Models/Meta').create({
        name: "Meta A",
        year: 2020,
        centro_de_custo_id: costcenter.id,
    })
    const response = await client.delete("/goal/1").send().loginVia(usuario, "jwt").end()
    const goal = await Meta.findBy('id', 1)
    response.assertStatus(204)
    assert.notExists(goal)
})


