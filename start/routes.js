'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
}).middleware(["auth"])
// AUTH
Route.post("/signin", "AuthController.signin")
Route.post("/signup", "AuthController.signup")
//CENTRO DE CUSTOS
Route.post("/costcenter", "CentroDeCustoController.store").middleware(["auth"])
Route.get("/costcenter", "CentroDeCustoController.index").middleware(["auth"])
Route.get("/costcenter/:id", "CentroDeCustoController.show").middleware(["auth"])
Route.put("/costcenter/:id", "CentroDeCustoController.update").middleware(["auth"])
Route.delete("/costcenter/:id", "CentroDeCustoController.destroy").middleware(["auth"])
//METAS
//INDICADORES
//RELATORIOS