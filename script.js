const input = document.getElementById("taskInput");
const add = document.getElementById("addButton");
const taskList = document.getElementById("taskContainer");
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
    taskDiv.className = "flex items-center border-b-[0.1px] border-gray-600 py-3 mt-2";

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

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "bg-[#C63A36] px-3 py-1 text-center font-normal rounded-sm hover:bg-[#c63b36b9] transition-colors duration-150 text-sm flex-shrink-0";

    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(taskDiv);     //remove from DOM
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem("allTasks", JSON.stringify(tasks));

        updateCounter();
    });

    taskDiv.append(checkBox);
    taskDiv.append(text);
    taskDiv.append(deleteBtn);

    taskList.append(taskDiv);
}

function updateCounter() {      //updates the total and completed
    taskCounter = tasks.length;

    numberOfCompleted = tasks.filter(task => task.completed).length;

    taskCounterContainer.innerHTML = `Total tasks: ${taskCounter} [Completed: ${numberOfCompleted}]`;
}