const express = require('express');   // importa o express
const routes = require('./routes');   // importa o arquivo de rotas da aplicação

require('./database/index');          // importa o arquivo de configuração com a conexão com o banco.

const app = express();                //inicia o serviço da aplicação

app.use(express.json());              // informa/habilita pra aplicação que vai se comunicar por json
app.use(routes);                      // Usa no serviço da aplicação as rotas criadas

app.listen(3333);                     // utiliza o serviço na porta 3333