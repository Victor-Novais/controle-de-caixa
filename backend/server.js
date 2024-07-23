const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const produtosRouter = require('./api/routes/produtos');
const comprasRouter = require('./api/routes/compras');
const financeiroRouter = require('./api/routes/financeiro');
const relatoriosRouter = require('./api/routes/relatorios');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/produtos', produtosRouter);
app.use('/api/compras', comprasRouter);
app.use('/api/financeiro', financeiroRouter);
app.use('/api/relatorios', relatoriosRouter);

app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}`);
});
