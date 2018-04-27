// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add Task Event
    form.addEventListener('submit', addTask);
    //Remove Task Event
    taskList.addEventListener('click', removeTask)
    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

//Get Tasks from localstorage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create TextNode and append to li
        li.appendChild(document.createTextNode(task));
        // Create new Link element
        const link = document.createElement('a');
        //Add Class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    } else {
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create TextNode and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new Link element
        const link = document.createElement('a');
        //Add Class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);

        //Store in localStorage
        storeTaskInLocalStorage(taskInput.value);

        //clear Input
        taskInput.value = '';

        e.preventDefault();
    }
}

// Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from localStoreage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    // Möglichkeit 1 - langsamer
    //taskList.innerHTML = '';

    //Möglichkeit 2 - schneller
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from localStorage
    clearTasksFromLocalStorage();
}

//Clear Tasks from localStorage
function clearTasksFromLocalStorage() {
    localStorage.clear('tasks');
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';          
        } else {
            task.style.display = 'none';
        }
    });
}