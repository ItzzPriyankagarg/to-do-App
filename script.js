//Select DOM elements
const allBtn = document.getElementById('all-btn');
const completedBtn = document.getElementById('completed-btn');
const pendingBtn = document.getElementById('pending-btn');
const todoInput = document.getElementById('to_doinput');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let currentFilter = 'all';
const saved = localStorage.getItem('todos');
let todos = saved ? JSON.parse(saved) : [];

function savetodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoNode(todo, index) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
       textspan.style.textDecoration = todo.completed ? "line-through" : ""; 
        savetodos();    
    });

    const textspan = document.createElement('span');
    textspan.textContent = todo.text;
    textspan.style.margin = '0 8px';
    if (todo.completed) {
        textspan.style.textDecoration = "line-through"; 
    }
        // todo edit by double click
            textspan.addEventListener('dblclick', () => {
            const newText = prompt('Edit todo:', todo.text);
            if (newText !== null && newText.trim() !== '') {
                todo.text = newText.trim();
                textspan.textContent = todo.text;
                savetodos();
                renderTodos();
            }});
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                todos.splice(index, 1);
                savetodos();
                renderTodos();
            });

            li.appendChild(checkbox);
            li.appendChild(textspan);
            li.appendChild(deleteButton);
            return li;

}

allBtn.addEventListener('click', () => {
    currentFilter = 'all';
    renderTodos();
});

completedBtn.addEventListener('click', () => {
    currentFilter = 'completed';
    renderTodos();
});

pendingBtn.addEventListener('click', () => {
    currentFilter = 'pending';
    renderTodos();
});


function renderTodos() {
    todoList.innerHTML = '';
      let filteredTodos = todos;

    if(currentFilter === 'completed'){
        filteredTodos = todos.filter(todo => todo.completed);
    }

    if(currentFilter === 'pending'){
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    filteredTodos.forEach((todo,index) => {
        const node = createTodoNode(todo,index);
        todoList.appendChild(node);
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
         todoInput.value = '';
        savetodos();
        renderTodos();
       
    }
}

addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
renderTodos();