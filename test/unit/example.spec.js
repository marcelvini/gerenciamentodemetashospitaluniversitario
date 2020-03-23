'use strict'

const { test } = use('Test/Suite')('Example')
const Imperium = use('Imperium')




Imperium.role('Admin', ({ auth, response }) => {
  return auth.user.role === 'Admin'
})
Imperium.role('Chefe', ({ auth, response }) => {
  return (auth.user.role === 'Admin' || auth.user.role === 'Chefe')
})
Imperium.role('Colaborador', ({ auth, response }) => {
  return (auth.user.role === 'Admin' || auth.user.role === 'Chefe' || auth.user.role === 'Colaborador')
})
test('make sure 2 + 2 is 4', async ({ assert }) => {
  assert.equal(2 + 2, 4)
})
