import knex from 'knex'

export const db = knex({
    client: "mysql",
    connection: {
        host: 's',
        port: 3306,
        user: 's',
        password: 's',
		database: 'bamboo'
    }
})