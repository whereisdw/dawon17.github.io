const todoForm = document.querySelector('.todo-form');
const todoInput = todoForm.querySelector('.todoInput');
const todolist = document.getElementById('todolist');
const TODOS_KEY = 'todos';
let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const delBtn = event.target.parentElement;
  const li = delBtn.parentElement;
  //console.dir(event.target)
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}

function checkTodo(event) {
  const uncheckBtn = event.target.parentElement;
  const li = uncheckBtn.parentElement;
  const checkedBtn = li.childNodes[0];
  checkedBtn.classList.remove('unchecked');
  li.classList.remove('unchecked');
  checkedBtn.classList.add('checked');
  li.classList.add('checked');
  checkedBtn.style.display = 'inline';
  uncheckBtn.style.display = 'none';
  const checking = todos.filter(function (todo) {
    if (todo.id === parseInt(li.id)) {
      todo.checked = true;
    }
    return todo;
  });
  todos = checking;
  saveTodos();
}
function uncheckBtnTodo(event) {
  const checkBtn = event.target.parentElement;
  const li = checkBtn.parentElement;
  const uncheckedBtn = li.childNodes[1];
  uncheckedBtn.classList.remove('checked');
  li.classList.remove('checked');
  uncheckedBtn.classList.add('unchecked');
  li.classList.add('unchecked');
  uncheckedBtn.style.display = 'inline';
  checkBtn.style.display = 'none';
  const checking = todos.filter(function (todo) {
    if (todo.id === parseInt(li.id)) {
      todo.checked = false;
    }
    return todo;
  });
  todos = checking;
  saveTodos();
}

function addTodo(newTodo, checked) {
  //create
  const li = document.createElement('li');
  const uncheckBtn = document.createElement('button');
  const checkBtn = document.createElement('button');
  const span = document.createElement('span');
  const delBtn = document.createElement('button');
  //add classlist
  uncheckBtn.classList.add('uncheckBtn');
  checkBtn.classList.add('checkBtn');
  delBtn.classList.add('delBtn');
  //appendchild
  li.appendChild(checkBtn);
  li.appendChild(uncheckBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  todolist.appendChild(li);
  //new id
  const newId = todos.length + 1;
  li.id = newId;
  //inner Text
  span.innerText = newTodo;
  uncheckBtn.innerHTML = '<i class="far fa-circle"></i>';
  checkBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
  delBtn.innerHTML = '<i class="fas fa-times-circle"></i>';
  //event listeners
  delBtn.addEventListener('click', deleteTodo);
  checkBtn.addEventListener('click', uncheckBtnTodo);
  uncheckBtn.addEventListener('click', checkTodo);
  //if
  if (checked === true) {
    uncheckBtn.style.display = 'none';
    checkBtn.classList.add('checked');
    li.classList.add('checked');
  }
  if (checked === false) {
    checkBtn.style.display = 'none';
    uncheckBtn.classList.add('unchecked');
    li.classList.add('unchecked');
  }
  //add on first
  todolist.insertBefore(li, todolist.firstChild);
  //push
  const newTodoObj = {
    text: newTodo,
    id: newId,
    checked: checked,
  };
  todos.push(newTodoObj);
  saveTodos();
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = '';
  addTodo(newTodo, false);
}

function loadTodos() {
  const savedTodos = localStorage.getItem(TODOS_KEY);
  if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    parsedTodos.forEach((todo) => {
      addTodo(todo.text, todo.checked);
    });
  }
}

function init() {
  loadTodos();
  todoForm.addEventListener('submit', handleTodoSubmit);
}
init();
