'use strict'

const { test, trait, afterEach } = use('Test/Suite')('Indicator')
const Indicador = use('App/Models/Indicador')
const Factory = use('Factory')
const ace = require('@adonisjs/ace')

trait('Test/ApiClient')
trait('Auth/Client')

afterEach(async () => {
    await ace.call('migration:rollback', {}, { silent: true })
    await ace.call('migration:run', {}, { silent: true })
})
test('it should create a new indicator on database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const costcenter = await Factory.model('App/Models/CentroDeCusto').create()
    const goal = await Factory.model('App/Models/Meta').create({
        centro_de_custo_id: costcenter.id,
    })
    const indicatortype = await Factory.model('App/Models/TipoIndicador').create()
    const response = await client.post("/indicator").send({
        name: "Indicador A",
        expected_value: 100,
        meta_id: goal.id,
        tipo_indicador_id: indicatortype.id
    }).loginVia(usuario, "jwt").end()
    const indicator = await Indicador.findBy('name', 'Indicador A')
    response.assertStatus(200)
    assert.exists(indicator)
})
test('it should update the indicator on database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const costcenter = await Factory.model('App/Models/CentroDeCusto').create()
    const goal = await Factory.model('App/Models/Meta').create({
        centro_de_custo_id: costcenter.id,
    })
    const indicatortype = await Factory.model('App/Models/TipoIndicador').create()
    await Factory.model('App/Models/Indicador').create({
        name: "indicador A",
        expected_value: 100,
        meta_id: goal.id,
        tipo_indicador_id: indicatortype.id,
    })
    const response = await client.put("/indicator/1").send({
        name: "Indicador B",
    }).loginVia(usuario, "jwt").end()
    const indicatorafterupdate = await Indicador.findBy('id', 1)
    assert.equal("Indicador B", indicatorafterupdate.name)
    response.assertStatus(200)
    assert.exists(indicatorafterupdate)
})
test('it should return an array countaining all Indicators in database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const indicators = await Factory.model('App/Models/Indicador').createMany(3)
    const response = await client.get("/indicator").send().loginVia(usuario, "jwt").end()


    response.assertStatus(200)
    response.assertJSONSubset([
        { name: indicators[0].name },
        { name: indicators[1].name },
        { name: indicators[2].name }
    ])
})
test('it should show the indicator with id equal to id param on url', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const costcenter = await Factory.model('App/Models/CentroDeCusto').create()
    const goal = await Factory.model('App/Models/Meta').create({
        centro_de_custo_id: costcenter.id,
    })
    const indicatortype = await Factory.model('App/Models/TipoIndicador').create()
    await Factory.model('App/Models/Indicador').create({
        name: "indicador A",
        expected_value: 100,
        meta_id: goal.id,
        tipo_indicador_id: indicatortype.id,
    })
    const response = await client.get("/indicator/1").send().loginVia(usuario, "jwt").end()
    const indicator = await Indicador.findBy('id', 1)
    assert.equal("indicador A", indicator.name)
    response.assertStatus(200)
    assert.exists(indicator)
})
test('it should delete the indicator with id equal to id param on url', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const costcenter = await Factory.model('App/Models/CentroDeCusto').create()
    const goal = await Factory.model('App/Models/Meta').create({
        centro_de_custo_id: costcenter.id,
    })
    const indicatortype = await Factory.model('App/Models/TipoIndicador').create()
    await Factory.model('App/Models/Indicador').create({
        name: "indicador A",
        expected_value: 100,
        meta_id: goal.id,
        tipo_indicador_id: indicatortype.id,
    })
    const response = await client.delete("/indicator/1").send().loginVia(usuario, "jwt").end()
    const indicator = await Indicador.findBy('id', 1)
    response.assertStatus(204)
    assert.notExists(indicator)
})


