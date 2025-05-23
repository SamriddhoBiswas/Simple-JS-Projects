const inputElement = document.getElementById("todo-input");
const addBtnElement = document.getElementById("add-btn");
const listElement = document.getElementById("list-container");


function addTodo (){
    if (inputElement.value == ""){
        alert("Please enter some text.");
        saveTodo();
    }
    else{
        const li = document.createElement("li");
        li.innerHTML = inputElement.value;
        listElement.appendChild(li);
        const i = document.createElement("i");
        i.classList.add("fa-solid");
        i.classList.add("fa-trash-can");
        li.appendChild(i);
        inputElement.value = "";
        saveTodo()
    }
}

listElement.addEventListener("click", (e) => {
    if (e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        saveTodo();
    }
    else if (e.target.tagName =="I"){
        e.target.parentElement.remove();
        saveTodo();
    }
})

function saveTodo(){
    localStorage.setItem("todo", listElement.innerHTML);
}

listElement.innerHTML = localStorage.getItem("todo");

addBtnElement.addEventListener("click", addTodo);