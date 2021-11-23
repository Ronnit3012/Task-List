// Define UI Vars   (UI - User Interface)
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
LoadEventListeners();

// Load all event listeners
function LoadEventListeners() {          // to call an event whenever Add Task button has been clicked
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter task event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {               // this will create a new list of thehistory of the tasks added after reloading the page
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];             // if there are no tasks
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));   // Converting strings to JSON object
    }

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));     

        // FOR LINK ELEMENT
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // Append to li
        li.appendChild(link);         

        // Append li to the ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask() {
    if(taskInput.value === '') {       // for when input field is empty and add task has been clicked
        alert('Add a Task');
    } 
    
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));     // to give text to the task from the input field directly

    // FOR LINK ELEMENT
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append to li
    li.appendChild(link);         // appending link (cross) to li

    // Append li to the ul
    taskList.appendChild(li);     // appending the list to the ul

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);      // storing tasks in the local storage

    //  Clear Input
    taskInput.value = '';       // this will clear the Input firld after every task has been added to the list

    // console.log(li);
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];             // if there are no tasks
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));   // Converting strings to JSON object
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));   // converting JSON object into strings and string it in an array with primary key as "tasks"
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {        // it will ask for confirmation every time we click on the cross
            e.target.parentElement.parentElement.remove();         // it will remove the task
        }
    }

    // Remove from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);    // this will remove tasks from the local storage

    e.preventDefault();
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {          // this will remove task from the storage after clicking the cross, after the page has been reloaded 
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];             
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    tasks.forEach(function(task, index) {      // we will traverse through the array with task as its task name and index as its position
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);          // this will remove the list at the present index and only one from the local storage, after the page has been reloaded
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));     // this will list the new updated task list
}

// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = '';

    // Faster 
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);           // this will remove all the tasks from the task list
    }

    // https://jsperf.com/innerhtml-vs-removechild     // Difference between directly clearing of the lists and looping on each list to be cleared

    // Clear from Local Storage
    clearTasksFromLocalStorage();       // Creating function for clearing Tasks
}

// Clear tasks from Local Storage
function clearTasksFromLocalStorage() {
    localStorage.clear();          // this will clear the whole storage on clicking Clear Tasks Button
}

// Filter Tasks          // it will search for the task with every letter entered in the filter input field
function filterTasks() {
    const text = e.target.value.toLowerCase();     // it will take the value from the input field of the filter text and convert it into lower case and store it in const text

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;                  // it will store the current text in the Input field
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';       // it will show the matches 
        } else {
            task.style.display = 'none';       // it will show nothing if the text doesnt matches with any task
        }
    });
}