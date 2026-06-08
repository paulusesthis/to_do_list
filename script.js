const input = document.getElementById("taskInput");
const add = document.getElementById("addButton");
const taskList = document.getElementById("taskContainer");
let taskCounterContainer = document.getElementById("taskCounterContainer");
let taskCounter = 0;
let numberOfCompleted = 0;
let tasks = [];

const savedTasks = localStorage.getItem("allTasks");
if (savedTasks) {
    tasks = JSON.parse(savedTasks);

    tasks.forEach(task => {
        displayTask(task.text);
    });
}

add.addEventListener("click", () => {
    if (input.value.trim() === "") {
        return;
    }

    saveTask(input.value);
    displayTask(input.value);
    input.value = "";
})

function saveTask(taskText) {
    tasks.push({
        text: taskText,
        completed: false
    })

    localStorage.setItem("allTasks", JSON.stringify(tasks));
}

function displayTask(taskText) {
    taskCounter++;
    taskCounterContainer.innerHTML = `Total tasks: ${taskCounter} [Completed: ${numberOfCompleted}]`;

    const taskDiv = document.createElement("div");
    taskDiv.className = "flex items-center border-b-[0.1px] border-gray-600 py-3 mt-2";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "w-4 h-4 flex-shrink-0 accent-[#ecb424]";

    checkBox.addEventListener("click", () => {
        taskDiv.classList.toggle("completed");

        numberOfCompleted = document.querySelectorAll(".completed").length;

        taskCounterContainer.innerHTML = `Total tasks: ${taskCounter} [Completed: ${numberOfCompleted}]`;
    });

    const text = document.createElement("p");
    text.className = "text-[14px] w-full mx-3";
    text.innerText = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "bg-[#C63A36] px-3 py-1 text-center font-normal rounded-sm hover:bg-[#c63b36b9] transition-colors duration-150 text-sm flex-shrink-0";

    deleteBtn.addEventListener("click", () => {
        taskDiv.remove();
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem("allTasks", JSON.stringify(tasks));

        taskCounter = document.querySelectorAll("#taskContainer > div").length;
        numberOfCompleted = document.querySelectorAll(".completed").length;

        taskCounterContainer.innerHTML = `Total tasks: ${taskCounter} [Completed: ${numberOfCompleted}]`;
    });

    taskDiv.append(checkBox);
    taskDiv.append(text);
    taskDiv.append(deleteBtn);

    taskList.append(taskDiv);
}
