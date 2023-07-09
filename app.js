// SELECTOR
const todoInput = document.querySelector(".todo-input");
const todoAdd = document.querySelector(".todo-add");
const todoList = document.querySelector(".todo-list");
const selectFilter = document.querySelector(".filter-todos");

// EVENTS LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoAdd.addEventListener("click", addItem);
todoList.addEventListener("click", removeItem);
selectFilter.addEventListener("click", filterTodo);
// FUNCTIONS
function addItem(event) {
  event.preventDefault();

  const inputValue = todoInput.value;
  // SAVE TO LOCAL STORAGE
  saveLocalTodo(inputValue);
  // CLEAR INPUT
  todoInput.value = "";

  // CREATE LI, CHECK AND DELETE BUTTON
  const newItem = document.createElement("li");
  newItem.classList.add("todo-item");
  todoList.appendChild(newItem);

  const newTask = document.createElement("span");
  newTask.classList.add("todo-task");
  newTask.innerText = inputValue;
  newItem.appendChild(newTask);

  const checkButton = document.createElement("button");
  checkButton.classList.add("todo-check");
  checkButton.innerHTML = '<i class="fas fa-regular fa-check"></i>';
  newItem.appendChild(checkButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("todo-delete");
  deleteButton.innerHTML = '<i class="fas fa-regular fa-xmark"></i>';
  newItem.appendChild(deleteButton);
}

function removeItem(event) {
  const target = event.target;
  const parent = target.parentElement;
  if (target.classList[0] === "todo-delete") {
    parent.classList.add("fall");
    removeLocalTodo(parent.children[0]);
    parent.addEventListener("transitionend", () => {
      parent.remove();
    });
  }
  if (target.classList[0] === "todo-check") {
    parent.classList.toggle("checked");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "checked":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "unchecked":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    // CREATE LI, CHECK AND DELETE BUTTON
    const newItem = document.createElement("li");
    newItem.classList.add("todo-item");
    todoList.appendChild(newItem);

    const newTask = document.createElement("span");
    newTask.classList.add("todo-task");
    newTask.innerText = todo;
    newItem.appendChild(newTask);

    const checkButton = document.createElement("button");
    checkButton.classList.add("todo-check");
    checkButton.innerHTML = '<i class="fas fa-regular fa-check"></i>';
    newItem.appendChild(checkButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("todo-delete");
    deleteButton.innerHTML = '<i class="fas fa-regular fa-xmark"></i>';
    newItem.appendChild(deleteButton);
  });
}

function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todos.indexOf(todo.innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
