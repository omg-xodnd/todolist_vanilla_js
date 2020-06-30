const inputContainer = document.querySelector(".input-container"),
      btnShowInput = document.querySelector('.btn-show-input'),
      warning = document.querySelector("#warning-msg"),
      noTask = document.querySelector(".no-task"),
      todoList = document.querySelector(".todo-list"),
      doneList = document.querySelector(".done-list"),
      clock = document.querySelector('#clock'),
      today = document.querySelector('#today')
let counter = 0,
    taskList = []

btnShowInput.addEventListener("mouseover", showInput)

function showInput () {
    const input = document.createElement("input"),
          btn = document.createElement("div"),
          icon = document.createElement("i")

    input.id = "task-input"
    btn.classList.add("btn", "add-btn")
    btn.innerText = "+"

    btnShowInput.parentNode.removeChild(btnShowInput)
    inputContainer.appendChild(input)
    inputContainer.appendChild(btn)
    input.focus()

    btn.addEventListener("click", submitInput)
    input.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {submitInput()}
    })
}

function addTaskToList(task) {
    const li = document.createElement("li"),
          div = document.createElement("div"),
          icon = document.createElement("i")

    li.id = 't'+task.id
    li.classList.add("task")
    div.classList.add("task-text")
    div.innerText = task.text
    div.addEventListener("click", finishTask)
    icon.classList.add("fas", "fa-trash-alt")
    icon.addEventListener("click", deleteTask)
    li.appendChild(div)
    li.appendChild(icon)
    if (task.done == true) {
        doneList.appendChild(li)
        li.classList.add("done")
    }else{
        todoList.appendChild(li)
    }
}

function submitInput() {
    const input = document.getElementById("task-input")
    if (input.value) {
        task = {
            text: input.value,
            id: counter++,
            done: false,
        }

        taskList.push(task)
        addTaskToList(task)
        checkList()
        input.value = null
        warning.style.display = "none"
    }else{
        warning.style.display = "block"
    }
}

function checkList() {
    saveList()
    if (!taskList.length) {
        noTask.style.display = "block"
        counter = 0
    }else{
        noTask.style.display = "none"
    }
}

function deleteTask() {
    const task = event.target.parentNode,
          idx = task.id.slice(1)
    const deletedTodo = taskList.filter(function(task){
        return task.id != idx
    })
    taskList = deletedTodo
    task.parentNode.removeChild(task)
    checkList()
}

function finishTask() {
    const task = event.target.parentNode,
          idx = task.id.slice(1)
    
    taskList.forEach((t) => {if (t.id == idx) {t.done = true}})
    task.parentNode.removeChild(task)
    doneList.appendChild(task)
    task.classList.add("done")
    event.target.removeEventListener("click", finishTask)
    event.target.addEventListener("click", unfinishTask)

    saveList()
}

function unfinishTask() {
    const task = event.target.parentNode,
          idx = task.id.slice(1)

    taskList.forEach((t) => {if(t.id == idx){t.done = false}})
    task.parentNode.removeChild(task)
    todoList.appendChild(task)
    task.classList.remove("done")
    event.target.removeEventListener("click", unfinishTask)
    event.target.addEventListener("click", finishTask)
    saveList()
}

function getTime() {
    const dateObj = new Date(),
          month = dateObj.getMonth(),
          date = dateObj.getDate(),
          dayArr = ['일', '월', '화', '수', '목', '금', '토'],
          day = dayArr[dateObj.getDay()],
          hour = dateObj.getHours(),
          min = dateObj.getMinutes()
    
    clock.innerText = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`
    today.innerText = `${month}월 ${date}일 ${day}요일`
}


function saveList() {
    localStorage.setItem("TASK_LIST", JSON.stringify(taskList))
    localStorage.setItem("COUNTER", JSON.stringify(counter))
}

function loadList() {
    const loadedTodo = localStorage.getItem("TASK_LIST"),
          loadedCounter = localStorage.getItem("COUNTER")

    if (loadedTodo !== null){
        const parsedTodo = JSON.parse(loadedTodo)
        taskList = parsedTodo
        parsedTodo.forEach(function(task){
            addTaskToList(task);
        })
    }    
    if (loadedCounter !== null){
        const parsedCounter = JSON.parse(loadedCounter)
        counter = parsedCounter
    }
}

function init() {
    loadList()
    saveList()
    checkList()
    getTime()
    setInterval(getTime, 60000)
}

init()