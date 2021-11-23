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
    // Add task event
    form.addEventListener('submit', addTask);
}

// Add Task
function addTask(e) {
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

    //  Clear Input
    taskInput.value = '';       // this will clear the Input firld after every task has been added to the list

    // console.log(li);

    e.preventDefault();
}







