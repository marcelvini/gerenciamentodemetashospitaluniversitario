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
Route.post("/goal", "MetaController.store").middleware(["auth"])
Route.get("/goal", "MetaController.index").middleware(["auth"])
Route.get("/goal/:id", "MetaController.show").middleware(["auth"])
Route.put("/goal/:id", "MetaController.update").middleware(["auth"])
Route.delete("/goal/:id", "MetaController.destroy").middleware(["auth"])
//TIPOS DE INDICADORES
Route.post("/indicatortype", "TipoIndicadorController.store").middleware(["auth"])
Route.get("/indicatortype", "TipoIndicadorController.index").middleware(["auth"])
Route.get("/indicatortype/:id", "TipoIndicadorController.show").middleware(["auth"])
Route.delete("/indicatortype/:id", "TipoIndicadorController.destroy").middleware(["auth"])
//INDICADORES
Route.post("/indicator", "IndicadorController.store").middleware(["auth"])
Route.get("/indicator", "IndicadorController.index").middleware(["auth"])
Route.get("/indicator/:id", "IndicadorController.show").middleware(["auth"])
Route.put("/indicator/:id", "IndicadorController.update").middleware(["auth"])
Route.delete("/indicator/:id", "IndicadorController.destroy").middleware(["auth"])
//HISTORICO DE INDICADORES
Route.post("/historyindicator", "HistoricoIndicadorController.store").middleware(["auth"])
Route.get("/historyindicator", "HistoricoIndicadorController.index").middleware(["auth"])
Route.get("/historyindicator/:id", "HistoricoIndicadorController.show").middleware(["auth"])
Route.put("/historyindicator/:id", "HistoricoIndicadorController.update").middleware(["auth"])
Route.delete("/historyindicator/:id", "HistoricoIndicadorController.destroy").middleware(["auth"])
//RELATORIOS