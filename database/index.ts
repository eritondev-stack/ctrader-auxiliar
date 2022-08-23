import knex from 'knex'

const db = knex({
    client: 'mysql',
    connection: {
      host : 'mysql745.umbler.com',
      port : 41890,
      user : 'eritondev',
      password : 'e4FdL9H*}U',
      database : 'market-financial'
    }
  });

  export { db }