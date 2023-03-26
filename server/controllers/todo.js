const Todo = require("../models/todo");

exports.getTodos = (req, res, next) => {
  Todo.findAll({ where: { done: false } })
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err));
};

exports.getCompleted = (req, res, next) => {
  Todo.findAll({ where: { done: true } })
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err));
};

exports.postAddTodo = (req, res, next) => {
  Todo.create({ ...req.body })
    .then((todos) => res.json(todos.dataValues))
    .catch((err) => console.log(err));
};

exports.putTodoDone = (req, res, next) => {
  const id = req.params.id;
  Todo.findByPk(id)
    .then((todo) => {
      todo.done = true;
      return todo.save();
    })
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => console.log(err));
};

exports.deleteTodo = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Todo.findByPk(id)
    .then((todo) => todo.destroy())
    .then(() => res.json({ status: "ok" }))
    .catch((err) => console.log(err));
};
