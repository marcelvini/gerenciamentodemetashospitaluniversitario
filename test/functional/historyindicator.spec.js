'use strict'

const { test, trait, afterEach } = use('Test/Suite')('History Indicator')
const HistoricoIndicador = use('App/Models/HistoricoIndicador')
const Factory = use('Factory')
const ace = require('@adonisjs/ace')

trait('Test/ApiClient')
trait('Auth/Client')

afterEach(async () => {
    await ace.call('migration:rollback', {}, { silent: true })
    await ace.call('migration:run', {}, { silent: true })
})
test('it should create a new history indicator on database', async ({ assert, client }) => {
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
        centro_de_custos_id: costcenter.id,
    })
    const indicatortype = await Factory.model('App/Models/TipoIndicador').create()
    const indicator = await Factory.model('App/Models/Indicador').create({
        meta_id: goal.id,
        tipo_indicador_id: indicatortype.id,
    })
    const response = await client.post("/historyindicator").send({
        value: 113.5,
        indicador_id: indicator.id,
    }).loginVia(usuario, "jwt").end()
    const historyIndicator = await HistoricoIndicador.findBy('value', 113.5)
    response.assertStatus(200)
    assert.exists(historyIndicator)
})
test('it should update the history indicator on database', async ({ assert, client }) => {
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
        centro_de_custos_id: costcenter.id,
    })
    const indicatortype = await Factory.model('App/Models/TipoIndicador').create()
    const indicator = await Factory.model('App/Models/Indicador').create({
        meta_id: goal.id,
        tipo_indicador_id: indicatortype.id,
    })
    await Factory.model('App/Models/HistoricoIndicador').create({
        value: 113.5,
        indicador_id: indicator.id,
    })
    const response = await client.put("/historyindicator/1").send({
        value: 100.0,
    }).loginVia(usuario, "jwt").end()
    const historyindicatorafterupdate = await HistoricoIndicador.findBy('id', 1)
    assert.equal(100.0, historyindicatorafterupdate.value)
    response.assertStatus(200)
    assert.exists(historyindicatorafterupdate)
})
test('it should return an array countaining all history indicators in database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    const historyindicators = await Factory.model('App/Models/HistoricoIndicador').createMany(3)
    const response = await client.get("/historyindicator").send().loginVia(usuario, "jwt").end()


    response.assertStatus(200)
    response.assertJSONSubset([
        { value: historyindicators[0].value },
        { value: historyindicators[1].value },
        { value: historyindicators[2].value }
    ])
})
test('it should show the history indicator with id equal to id param on url', async ({ assert, client }) => {
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
        centro_de_custos_id: costcenter.id,
    })
    const indicatortype = await Factory.model('App/Models/TipoIndicador').create()
    const indicator = await Factory.model('App/Models/Indicador').create({
        meta_id: goal.id,
        tipo_indicador_id: indicatortype.id,
    })
    await Factory.model('App/Models/HistoricoIndicador').create({
        value: 113.5,
        indicador_id: indicator.id,
    })
    const response = await client.get("/historyindicator/1").send().loginVia(usuario, "jwt").end()
    const historyIndicator = await HistoricoIndicador.findBy('id', 1)
    assert.equal(113.5, historyIndicator.value)
    response.assertStatus(200)
    assert.exists(historyIndicator)
})
test('it should delete the history indicator with id equal to id param on url', async ({ assert, client }) => {
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
        centro_de_custos_id: costcenter.id,
    })
    const indicatortype = await Factory.model('App/Models/TipoIndicador').create()
    const indicator = await Factory.model('App/Models/Indicador').create({
        meta_id: goal.id,
        tipo_indicador_id: indicatortype.id,
    })
    await Factory.model('App/Models/HistoricoIndicador').create({
        value: 113.5,
        indicador_id: indicator.id,
    })
    const response = await client.delete("/historyindicator/1").send().loginVia(usuario, "jwt").end()
    const historyIndicator = await HistoricoIndicador.findBy('id', 1)
    response.assertStatus(204)
    assert.notExists(historyIndicator)
})


