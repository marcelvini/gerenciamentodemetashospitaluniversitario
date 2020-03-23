
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
