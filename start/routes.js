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
Route.post("/costcenter", "CentroDeCustoController.store").middleware(["auth", 'is:Chefe'])
Route.get("/costcenter", "CentroDeCustoController.index").middleware(["auth", 'is:Colaborador'])
Route.get("/costcenter/:id", "CentroDeCustoController.show").middleware(["auth", 'is:Colaborador'])
Route.put("/costcenter/:id", "CentroDeCustoController.update").middleware(["auth", 'is:Chefe'])
Route.delete("/costcenter/:id", "CentroDeCustoController.destroy").middleware(["auth", 'is:Chefe'])
//METAS
Route.post("/goal", "MetaController.store").middleware(["auth", 'is:Chefe'])
Route.get("/goal", "MetaController.index").middleware(["auth", 'is:Colaborador'])
Route.get("/goal/:id", "MetaController.show").middleware(["auth", 'is:Colaborador'])
Route.put("/goal/:id", "MetaController.update").middleware(["auth", 'is:Chefe'])
Route.delete("/goal/:id", "MetaController.destroy").middleware(["auth", 'is:Chefe'])
//TIPOS DE INDICADORES
Route.post("/indicatortype", "TipoIndicadorController.store").middleware(["auth", 'is:Chefe'])
Route.get("/indicatortype", "TipoIndicadorController.index").middleware(["auth", 'is:Colaborador'])
Route.get("/indicatortype/:id", "TipoIndicadorController.show").middleware(["auth", 'is:Colaborador'])
Route.delete("/indicatortype/:id", "TipoIndicadorController.destroy").middleware(["auth", 'is:Chefe'])
//INDICADORES
Route.post("/indicator", "IndicadorController.store").middleware(["auth", 'is:Chefe'])
Route.get("/indicator", "IndicadorController.index").middleware(["auth", 'is:Colaborador'])
Route.get("/indicator/:id", "IndicadorController.show").middleware(["auth", 'is:Colaborador'])
Route.put("/indicator/:id", "IndicadorController.update").middleware(["auth", 'is:Chefe'])
Route.delete("/indicator/:id", "IndicadorController.destroy").middleware(["auth", 'is:Chefe'])
//HISTORICO DE INDICADORES
Route.post("/historyindicator", "HistoricoIndicadorController.store").middleware(["auth", 'is:Chefe'])
Route.get("/historyindicator", "HistoricoIndicadorController.index").middleware(["auth", 'is:Colaborador'])
Route.get("/historyindicator/:id", "HistoricoIndicadorController.show").middleware(["auth", 'is:Colaborador'])
Route.put("/historyindicator/:id", "HistoricoIndicadorController.update").middleware(["auth", 'is:Chefe'])
Route.delete("/historyindicator/:id", "HistoricoIndicadorController.destroy").middleware(["auth", 'is:Chefe'])
//RELATORIOS
Route.get("/fullreport", "RelatorioController.goalsstatus").middleware(["auth", 'is:Colaborador'])