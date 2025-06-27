const Router = require('koa-router')
const todoController = require('../controllers/todoController')

const router = new Router({
    prefix: '/api'
});

// Todo api
router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodo);

router.post('/todos', todoController.addTodo);
router.post('/todos/delete-many', todoController.deleteTodos);

router.put('/todos/:id', todoController.updateTodo);
router.put('/todos', todoController.updateTodos);

router.del('/todos/:id', todoController.deleteById);

module.exports = router;