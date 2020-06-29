const inputContainer = document.querySelector(".input-container"),
      btnShowInput = document.querySelector('.btn-show-input')

function showInput () {
    const input = document.createElement("input")
    const btn = document.createElement("span")
    input.id = "todo-input"
    btn.classList.add("add-btn")
    btn.classList.add("btn")
    btn.innerText = "add"
    inputContainer.appendChild(input)
    inputContainer.appendChild(btn)
    btnShowInput.parentNode.removeChild(btnShowInput)
}

btnShowInput.addEventListener("mouseover", showInput)