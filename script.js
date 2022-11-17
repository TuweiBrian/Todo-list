const form = document.querySelector('form');
const taskList = document.querySelector('.items');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('.filter');
const taskInput = document.querySelector('#task');

//Load all Event listners
loadEventListeners();

function loadEventListeners(){
    //DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task form
    form.addEventListener('submit',addTask)
    //remove task event
    taskList.addEventListener('click',removeTask)
    //clear task event
    clearBtn.addEventListener('click',clearTasks);
    //filter tasks
    filter.addEventListener('keyup', filterTasks);
}
//get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
         //create li element
        const li = document.createElement('li');

        //add classname
        li.className = 'collection-item'
        //create textnode
        li.appendChild(document.createTextNode(task));
        //create link
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //append link to li
        li.appendChild(link)
        //append the li to the ul
        taskList.appendChild(li);
    })
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task')
    }
    //create li element
    const li = document.createElement('li');

    //add classname
    li.className = 'collection-item'
    //create textnode
    li.appendChild(document.createTextNode(taskInput.value));
    //create link
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append link to li
    li.appendChild(link)
    //append the li to the ul
    taskList.appendChild(li);

    //Store in local Storage
    storeTaskInLocalStorage(taskInput.value);

    //clear the input
    taskInput.value = ''

    console.log(li);


    e.preventDefault();
}

//Store Task in Local Storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log(e.target);
        if(confirm('Are you sure')){
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
//remove from local Storage
function removeTaskFromLocalStorage(taskItem){
    console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks 
function clearTasks(){
    // taskList.innerHTML = '';

    //anothe way faster //https:..jsperf.com/innerhtml-vs-removechild
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear tasks from local Storage
    clearTasksFromLocalStorage();
    

}
//clear tasks from local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none'
        }
    });
}