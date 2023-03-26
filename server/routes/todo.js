const express = require('express');

const todoController = require('../controllers/todo');

const router = express.Router();

router.get('/todos', todoController.getTodos);

router.get('/todos/completed', todoController.getCompleted);

router.post('/todos/add-todo', todoController.postAddTodo);

router.put('/todos/completed/:id', todoController.putTodoDone);

router.delete('/todos/delete-todo/:id', todoController.deleteTodo);

module.exports = router;