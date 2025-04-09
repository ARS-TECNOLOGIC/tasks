const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT;
app.listen(PORT,'0.0.0.0',()=> console.log("Server rodando na porta "+ PORT));



