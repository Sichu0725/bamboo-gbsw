import knex from 'knex'

export const db = knex({
    client: "mysql",
    connection: {
        host: 'terminal.kro.kr',
        port: 3306,
        user: 'cth',
        password: 'xogur38997',
		database: 'bamboo'
    }
})