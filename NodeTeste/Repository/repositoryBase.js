let { Pool } = require('pg')

let pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TesteNode',
  password: '1234',
  port: 5432,
})

async function ExecuteQuery(query, params = null) {
  var client = await pool.connect();
  
  try {
    const res = await client.query(query, params);
    return res.rows;
  } catch (error) {
    console.error('Erro ao consultar o banco de dados:', error);
  }
  finally {
    client.release();
  }
}

module.exports = {
  ExecuteQuery
}