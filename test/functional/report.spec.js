'use strict'

const { test, trait, afterEach } = use('Test/Suite')('Report')
const Indicador = use('App/Models/Indicador')
const Factory = use('Factory')
const ace = require('@adonisjs/ace')

trait('Test/ApiClient')
trait('Auth/Client')

afterEach(async () => {
    await ace.call('migration:rollback', {}, { silent: true })
    await ace.call('migration:run', {}, { silent: true })

})
test('it should return the expected nums when no filters applied to fixed values and objects on database', async ({ assert, client }) => {
    const credentials = {
        email: "marcel@gmail.com",
        password: "123"
    }
    const usuario = await Factory.model('App/Models/Usuario').create({
        role: 'Admin',
        ...credentials

    })
    await Factory.model('App/Models/CentroDeCusto').create(
        { "name": "TI" }
    )
    await Factory.model('App/Models/CentroDeCusto').create(
        { "name": "RH" }
    )
    await Factory.model('App/Models/Meta').create(
        { "name": "metaTI1", "year": 2020, "centro_de_custo_id": 1 }

    )
    await Factory.model('App/Models/Meta').create(
        { "name": "metaTI2", "year": 2020, "centro_de_custo_id": 1 }

    )
    await Factory.model('App/Models/Meta').create(
        { "name": "metaRH1", "year": 2020, "centro_de_custo_id": 2 }

    )
    await Factory.model('App/Models/TipoIndicador').create(
        { "name": "Mensalporcentagem", "frequency": "mensal", "value_type": "porcentagem" }
    )
    await Factory.model('App/Models/TipoIndicador').create(
        { "name": "MensalValor", "frequency": "mensal", "value_type": "valor" }
    )
    await Factory.model('App/Models/Indicador').create(
        { "name": "indicadorTI1", "expected_value": 100, "tipo_indicador_id": 1, "meta_id": 1 }
    )
    await Factory.model('App/Models/Indicador').create(
        { "name": "indicadorTI2", "expected_value": 100, "tipo_indicador_id": 1, "meta_id": 2 }
    )
    await Factory.model('App/Models/Indicador').create(
        { "name": "indicadorRH1", "expected_value": 10000, "tipo_indicador_id": 2, "meta_id": 2 }
    )
    await Factory.model('App/Models/Indicador').create(
        { "name": "indicadorRH2", "expected_value": 100, "tipo_indicador_id": 2, "meta_id": 3 }
    )
    await Factory.model('App/Models/HistoricoIndicador').create(
        { "value": 100, "indicador_id": 1 }
    )
    await Factory.model('App/Models/HistoricoIndicador').create(
        { "value": 99, "indicador_id": 1 }
    )
    await Factory.model('App/Models/HistoricoIndicador').create(
        { "value": 99, "indicador_id": 2 }
    )
    await Factory.model('App/Models/HistoricoIndicador').create(
        { "value": 5000, "indicador_id": 3 }
    )
    await Factory.model('App/Models/HistoricoIndicador').create(
        { "value": 470, "indicador_id": 4 }
    )
    const response = await client.get("/fullreport").send().loginVia(usuario, "jwt").end()
    response.assertStatus(200)
    response.assertJSONSubset(
        {
            totalgeralmetas: 214.66666666666666,
            totalmetas: [
                {
                    "totalparcial": 99.5,
                    "m_id": 1
                },
                {
                    "totalparcial": 74.5,
                    "m_id": 2
                },
                {
                    "totalparcial": 470,
                    "m_id": 3
                }
            ]
        }
    )
})
