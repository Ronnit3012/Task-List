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

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // Filter task event
    filter.addEventListener('keyup', filterTasks);
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

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {        // it will ask for confirmation every time we click on the cross
            e.target.parentElement.parentElement.remove();         // it will remove the task
        }
    }
    // console.log(e.target);

    e.preventDefault();
}

// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = '';

    // Faster 
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);           // this will remove all the tasks from the task list
    }

    // https://jsperf.com/innerhtml-vs-removechild     // Difference between directly clearing of the lists and looping on each list to be cleared
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