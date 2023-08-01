// get the elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// get the todos from local storage
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
    // prevent the page from reloading
    e.preventDefault();

    addTodo();
});

function addTodo(todo) {
    // get the value of the input from the form
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    // if the input is not empty
    if (todoText) {
        // create a list item
        const todoElement = document.createElement("li");

        if (todo && todo.completed) {
            todoElement.classList.add("completed");
        }

        todoElement.innerText = todoText;

        todoElement.addEventListener("click", () => {
            // toggle the completed class on the list item when user left-clicks on it
            todoElement.classList.toggle("completed");

            updateLocalStorage();
        });

        todoElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            // remove a todo when user right-clicks on it
            todoElement.remove();
            updateLocalStorage();
        });

        todosUL.appendChild(todoElement);

        input.value = "";

        updateLocalStorage();
    }
}

// a function to update the local storage
function updateLocalStorage() {
    todosElement = document.querySelectorAll("li");

    const todos = [];

    todosElement.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}
