'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Usuario', (faker, i, data) => {
    return {
        name: faker.name(),
        email: faker.email(),
        password: faker.string(),
        role: faker.string(),
        ...data
    }
})
Factory.blueprint('App/Models/CentroDeCusto', (faker, i, data) => {
    return {
        name: faker.name(),
        ...data
    }
})
Factory.blueprint('App/Models/Meta', (faker, i, data) => {
    return {
        name: faker.name(),
        year: faker.integer(),
        centro_de_custos_id: 1,
        ...data
    }
})
Factory.blueprint('App/Models/TipoIndicador', (faker, i, data) => {
    return {
        frequency: faker.string(),
        value_type: faker.string(),
        ...data
    }
})
