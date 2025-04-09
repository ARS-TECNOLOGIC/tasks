require('dotenv').config();  // Carrega as variáveis do arquivo .env

const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,  // Certificados autoassinados podem ser aceitos
  },
});

client.connect()
  .then(() => console.log('Conectado ao PostgreSQL com SSL'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL', err.stack));

module.exports = client;