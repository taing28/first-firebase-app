const Router = require('koa-router')
const helloWorldController = require('../handlers/helloWorld')

const router = new Router({
    prefix: '/api'
});

router.get('/hello-world', helloWorldController.hello);

module.exports = router;