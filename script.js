const input = document.getElementById("taskInput");
const add = document.getElementById("addButton");
const taskList = document.getElementById("taskContainer");
const clearButton = document.getElementById("clearAll");
let taskCounterContainer = document.getElementById("taskCounterContainer");
let tasks = [];

const savedTasks = localStorage.getItem("allTasks");
if (savedTasks) {
    tasks = JSON.parse(savedTasks);

    for (let i = 0; i < tasks.length; i++) {
        displayTask(tasks[i]);
    }

    updateCounter();
};

add.addEventListener("click", () => {
    if (input.value.trim() === "") {
        alert("Please input a task");
        return;
    }

    const task = saveTask(input.value);
    displayTask(task);
    input.value = "";
    updateCounter();
})

clearButton.addEventListener("click", () => {
    if (tasks.length === 0) {
        alert("No tasks to clear")
        return;
    }

    const confirmClear = confirm("Are you sure you want to clear all tasks?");
    if (!confirmClear) {
        return;
    }

    tasks = [];
    localStorage.removeItem("allTasks");
    taskList.innerHTML = "";
    updateCounter();
})

function saveTask(taskText) {
    const task = {
        text: taskText,
        completed: false
    }

    tasks.push(task);
    localStorage.setItem("allTasks", JSON.stringify(tasks));
    return task;
}

function displayTask(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "flex items-center border-b-[0.1px] border-gray-600 px-3 py-3 mt-2 hover:bg-[#001325a6]";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "w-4 h-4 flex-shrink-0 accent-[#ecb424]";

    if (task.completed) {
        checkBox.checked = true;
        taskDiv.classList.add("completed");
    }

    checkBox.addEventListener("click", () => {
        taskDiv.classList.toggle("completed");
        task.completed = checkBox.checked;
        localStorage.setItem("allTasks", JSON.stringify(tasks));

        updateCounter();
    });

    const text = document.createElement("p");
    text.className = "text-[14px] w-full mx-3";
    text.innerText = task.text;

    const editBtn = document.createElement("button");
    editBtn.className = "bg-[#1861afa9] px-3 py-1 mr-1 flex items-center justify-center font-normal rounded-md hover:bg-[#1861af5f] transition-colors duration-150 text-sm flex-shrink-0";
    editBtn.innerText = "Edit";

    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task: ", task.text);

        if (newText === null || newText.trim() === "") {
            return;
        }

        task.text = newText.trim();

        text.innerText = task.text;

        localStorage.setItem("allTasks", JSON.stringify(tasks));
    })

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "bg-[#C63A36] px-3 py-1 flex items-center justify-center font-normal rounded-md hover:bg-[#c63b36b9] transition-colors duration-150 text-sm flex-shrink-0";

    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(taskDiv);     //remove from DOM
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem("allTasks", JSON.stringify(tasks));

        updateCounter();
    });

    taskDiv.append(checkBox);
    taskDiv.append(text);
    taskDiv.append(editBtn);
    taskDiv.append(deleteBtn);

    taskList.append(taskDiv);
}

function updateCounter() {      //updates the total and completed
    taskCounter = tasks.length;

    numberOfCompleted = tasks.filter(task => task.completed).length;

    taskCounterContainer.innerHTML = `Total tasks: ${taskCounter} [Completed: ${numberOfCompleted}]`;
}