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
    li.querySelector(".delete-btn").addEventListener("click", () => {
  li.classList.add("removing");
  setTimeout(() => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    li.remove();
  }, 300);
});


    taskList.appendChild(li);
    
}

function saveTasks() {

    localStorage.setItem('tasks', JSON.stringify(tasks))
    
}

})
