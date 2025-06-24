const Koa = require('koa');
const koaBody = require('koa-body').default;
const routes = require('../routes/routes');

const app = new Koa();

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

module.exports = app;