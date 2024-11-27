const { Pool } = require(`pg`)

const pool = new Pool({
    user:'professor',
    host: 'localhost',
    database:'spotifake',
    password: 'postgres',
    port: 5432,
})