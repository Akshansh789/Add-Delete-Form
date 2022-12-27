const addMessage = document.querySelector('.message');
const addName = document.querySelector('.name');
const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo');
const remove = document.querySelector('.remove');

let todoList = [];

function uniqueId() {
  return Math.random().toString(16).slice(2);
}

// a function to update the storage
// and update the displayed list
function updateTodoList (todoList) {
  localStorage.setItem('todo-list', JSON.stringify(todoList));
  displayMessages(todoList);
}

if (localStorage.getItem('todo-list')) {
   todoList = JSON.parse(localStorage.getItem('todo-list'));
   displayMessages(todoList);
}

addButton.addEventListener('click', function () {
  // use or '||' instead of '+'
  if (!addMessage.value || !addName.value) return;

  const newTodo = {
    id: uniqueId(),
    name: addName.value,
    message: addMessage.value,
    checked: false,
    important: false
  };

  addMessage.value = '';
  addName.value = '';

  todoList.push(newTodo);
  updateTodoList(todoList);
});

function removeMessage (id) {
  // iterate through the existing todoList
  // and using filter remove the todo that has an id
  // matching the todo we clicked delete on
  todoList = todoList.filter(
    function(todo) {
      // only return the ones that don't match
      return todo.id !== id;
    }
  )
  
  updateTodoList(todoList);
}

function displayMessages(todoList = []) {

  // Iterate through each todo with map.
  // For each todo return the list item HTML
  const messages = todoList.map(
    function(todo) {
      return `
      <li id="${todo.id}">
        Name:${todo.name}
        Message:${todo.message}
        <button class="remove" onClick="removeMessage('${todo.id}')">DELETE</button>
        <button class="edit">EDIT</button>
      </li>
      `;
    }
  );
  
  // join the array items into one big string
  // using a newline as a separator.
  todo.innerHTML = messages.join('\n');
}