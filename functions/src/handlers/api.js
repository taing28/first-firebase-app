const Koa = require('koa');
const routes = require('../routes/routes');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors({
    origin: 'http://localhost:3000',
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(routes.routes());
app.use(routes.allowedMethods());

module.exports = app;