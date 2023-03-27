//inputs
const todoInput = document.getElementById("todo-input");
const todoDescription = document.getElementById("todo-description");

//lists
const pendingList = document.getElementById("pending-todos");
const completedList = document.getElementById("completed-todos");

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/todos")
    .then((response) => {
      const todos = response.data;
      console.log(todos);
      todos.forEach((todo) => {
        addToList(todo);
      });
    })
    .catch((err) => console.log(err));
  axios.get("http://localhost:3000/todos/completed").then((response) => {
    const todos = response.data;
    todos.forEach((todo) => {
      addToCompletedList(todo);
    });
  });
});

const addTodoForm = document.getElementById("add-todo-form");
addTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoItem = {
    task: todoInput.value,
    description: todoDescription.value,
    done: false,
  };
  addTodo(todoItem);
});

function addTodo(item) {
  axios
    .post("http://localhost:3000/todos/add-todo", item)
    .then((response) => {
      addToList(response.data);
    })
    .catch((err) => console.log(err));
}

function deleteTodo(id) {
  axios
    .delete(`http://localhost:3000/todos/delete-todo/${id}`)
    .then((response) => {
      if (response.ok) location.reload();
    })
    .catch((err) => console.log(err));
}

function markTodoDone(id) {
  axios
    .put(`http://localhost:3000/todos/completed/${id}`)
    .then((response) => {
      addToCompletedList(response.data);
    })
    .catch((err) => console.log(err));
}

//helpers
function addToList(item) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  const task = document.createElement("h5");
  task.innerText = item.task;
  const desc = document.createElement("p");
  desc.innerText = item.description;
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";

  deleteBtn.addEventListener("click", deleteTodo.bind(null, item.id));

  doneBtn.addEventListener("click", markTodoDone.bind(null, item.id));

  li.append(task, desc, doneBtn, deleteBtn);
  pendingList.appendChild(li);
}

function addToCompletedList(item) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  const task = document.createElement("h5");
  task.innerText = item.task;
  const desc = document.createElement("p");
  desc.innerText = item.description;

  li.append(task, desc);
  completedList.appendChild(li);
}
