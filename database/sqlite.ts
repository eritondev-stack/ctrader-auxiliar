import knex from 'knex'

const dbSqlite = knex(
  {
    client: 'sqlite3',
    connection: {
      filename: 'database/db.sqlite'
    },
    useNullAsDefault: true,

  }
);

export { dbSqlite }