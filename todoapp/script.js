let todos = [];

const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
//function renderTodos() { ... }: This line defines a function named renderTodos. This function is responsible for updating the todo list in the HTML based on the data stored in the todos array.
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${index + 1}. ${todo.task} <span class="actions">
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
        <button class="completed-btn" data-index="${index}">Completed</button>
      </span>`;
    if (todo.completed) {
      li.classList.add("completed");
      li.querySelector(".completed-btn").disabled = true;
      li.querySelector(".edit-btn").disabled = true;
    }
    todoList.appendChild(li);
  });
}
//function addTodo() { ... }: This line defines a function named addTodo. This function is called when the user clicks the "Add" button to add a new todo to the list.
function addTodo() {
  const task = todoInput.value.trim();
  if (task !== "") {
    const todo = { task, completed: false };
    todos.push(todo);
    todoInput.value = "";
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function editTodo() {
    //e gets the index of the todo that the user wants to edit
  const index = parseInt(this.dataset.index);
  //This line opens a prompt dialog box asking the user to enter a new task for the selected todo. The default value in the prompt is set to the current task of the todo.
  const newTask = prompt("Enter a new task:", todos[index].task);
  if (newTask !== null && newTask.trim() !== "") {
    todos[index].task = newTask.trim();
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function deleteTodo() {
  const index = parseInt(this.dataset.index);
  todos.splice(index, 1);
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
}

function completeTodo() {
  const index = parseInt(this.dataset.index);
  todos[index].completed = true;
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
}

addBtn.addEventListener("click", addTodo);

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-btn")) {
    editTodo.call(event.target);
  }
  if (event.target.classList.contains("delete-btn")) {
    deleteTodo.call(event.target);
  }
  if (event.target.classList.contains("completed-btn")) {
    completeTodo.call(event.target);
  }
});

// Initialize the Todo List with the stored Todos
const storedTodos = localStorage.getItem("todos");
if (storedTodos) {
  todos = JSON.parse(storedTodos);
  renderTodos();
}
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      const container = document.createElement("div");
      container.classList.add("todo-container");
      container.innerHTML = `
        <span class="todo-text">${index + 1}. ${todo.task}</span>
        <span class="actions">
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
          <button class="completed-btn" data-index="${index}">Completed</button>
        </span>
      `;
      if (todo.completed) {
        container.querySelector(".todo-text").classList.add("completed");
        container.querySelector(".completed-btn").disabled = true;
        container.querySelector(".edit-btn").disabled = true;
      }
      li.appendChild(container);
      todoList.appendChild(li);
    });
  }
  