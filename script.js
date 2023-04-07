const $ = document.querySelector.bind(document);

const taskField = $("#taskfield");
const addTaskBtn = $("#addTask");
const taskList = $("#task-list");
let tasksFromMe = [];
let tasksFromLS = [];
let task;


addTaskBtn.addEventListener("click", function(e){
    e.preventDefault();
    let isEmptyString = checkEmptyValue(taskField.value);
        if(isEmptyString){
            handleAddTask();
            handleStoreTask(tasksFromMe);
        } else {
            alert("Please enter your task!");
        }
});

function handleAddTask(){
    createTaskElement(taskField.value);

    actionBtns();
    
    taskField.value = "";
    taskField.focus();
   
}

function completeTask(task){
    task.style.cssText = `
    text-decoration: line-through;
    `
}
function removeTask(task){
    task.remove();
}

// Check empty value
function checkEmptyValue(value){
    if(value == "")
    {
        return false;
    } else 
    {
        return true;
    }
}

function handleStoreTask(tasks){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function handleGetTasks(){
    tasksFromLS = localStorage.getItem("tasks");
    let myTaskList = JSON.parse(tasksFromLS);
    return myTaskList;
}

//Create task element
function createTaskElement(taskName){
    task = document.createElement("li");
    task.style.cssText = `
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    `;
    task.innerHTML = `<p>${taskName}</p>`;//Đã sửa

    //Invoke function store tas to LS
    tasksFromMe.push({
        task: task.textContent,
        isCompleted: false,//Đã sửa
    });

    taskList.appendChild(task);
}

function actionBtns(){
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete");
    completeBtn.innerText = "OK";

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.innerText = "X";

    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(removeBtn);
    task.appendChild(btnContainer);

    completeBtn.addEventListener("click", function(){
        const taskElement = this.parentElement.parentElement.childNodes[0];
        completeTask(taskElement);
    })

    removeBtn.addEventListener("click", function(){
        const taskElement = this.parentElement.parentElement;
        removeTask(taskElement);
    })

}

window.onload = function(){
    const myTasks = handleGetTasks();
    if(Array.isArray(myTasks)){
        for(let i = 0; i < myTasks.length; i++){//Đã sửa
            createTaskElement(myTasks[i].task);
            actionBtns();
        }
    }
}


// Save to Lc
// function saveTaskToLC(taskField){
//     localStorage.setItem("a", taskField.value);
// }
// window.onload = function() {
//     if (localStorage) {
//       document.getElementById('taskfield').addEventListener('addTask', function() {
//           var name = document.getElementById('task-list').value;
//           localStorage.setItem('task-list', name);
//       });
//     }
// }