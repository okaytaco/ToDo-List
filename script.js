document.addEventListener('DOMContentLoaded', () =>{
    const taskInput = document.getElementById("taskInput")
const addTaskBtn = document.getElementById("addTaskBtn")
const taskList = document.getElementById("taskList")


let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

tasks.forEach(task => renderTask(task));

addTaskBtn.addEventListener('click', () => {
    const taskTest = taskInput.value.trim()
    if (taskTest === "") return;

    const newTask = {
        id: Date.now(),
        text: taskTest,
        completed: false
    }

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    taskInput.value = ""; //clear input
    console.log(tasks);
})

function renderTask(task){
    const li = document.createElement('li')
    li.className = "task-item";
    li.setAttribute('data-id', task.id)
    if(task.completed) li.classList.add('completed');
    li.innerHTML = `
    <span>${task.text}</span>
    <button class = "delete-btn">delete</button>
    `;
    li.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTasks();
    })
    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation()  //prevent toggle from firing
        tasks = tasks.filter(t => t.id !== task.id)
        li.remove();
        saveTasks();
    });
    taskList.appendChild(li);
    
}

function saveTasks() {

    localStorage.setItem('tasks', JSON.stringify(tasks))
    
}

if(localStorage.getItem("theme") == "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️"
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
})

})
