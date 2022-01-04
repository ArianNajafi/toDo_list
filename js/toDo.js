//add new task:
const input_task = document.querySelector("#addTask");
const newTask_btn = document.querySelector("#addTask_btn");
const tasks_list = document.querySelector("#tasks");
const filter = document.querySelector("#filter-list");  
document.addEventListener("DOMContentLoaded", load_saved_task);  // this code is upload the past info that saved in local storage after refresh the page

// task array depent filters:
const all_tasks = [];
const completed_tasks = [];
const uncompleted_tasks = [];

//events:
newTask_btn.addEventListener("click", addTask);
tasks_list.addEventListener("click", doneORtrash);
filter.addEventListener("click", chosedFilter);

//functions:

    //add new task function:
function addTask(e){
    e.preventDefault();
         // add new task
    const newTask = makeTask(input_task.value)
    all_tasks.push( newTask );
    uncompleted_tasks.push( newTask );

    show_tasks(); // update list
    input_task.value = "";
}

    // made the new tasks:
function makeTask(textContent){
    const newTask_ = document.createElement("div");
    newTask_.classList = "task";
    newTask_.innerHTML = `                  
    <p id="task_content">${textContent}</p>
    <div id="task_btns">
        <button id="task_do" class="hover">
            <i class="fas fa-check-circle"></i>
        </button>
        <button id="task_remove" class="hover">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>`;
    return newTask_;
}

    //done or delete task funcion:
function doneORtrash(e){
    const classList_array = [...e.target.classList];
        // done task:
    if(classList_array[1] === "fa-check-circle"){
        const done_task = e.target.parentElement.parentElement.parentElement;
        done_task.classList.toggle ( "completed");

            // update completed_tasks
        const done_task_classlist = [...done_task.classList]
        if(done_task_classlist[1] === "completed")
            completed_tasks.push(e.target.parentElement.parentElement.parentElement);
        else{
            completed_tasks.splice(completed_tasks.indexOf(done_task),1,);
        }

            // update uncopleted_tasks
        if(done_task_classlist[1] === "completed")
            uncompleted_tasks.splice(uncompleted_tasks.indexOf(done_task),1,);
        else{
            uncompleted_tasks.push(done_task);
        }
        show_tasks();
    }

        // remove task:
    else if(classList_array[1] === "fa-trash-alt"){
            // remove removedTask from all_task
        all_tasks.forEach(task => { 
            if(task === e.target.parentElement.parentElement.parentElement) {
                all_tasks.splice(all_tasks.indexOf(task),1,);
            }
        });
            //remove removedTAsk from completed_task
        completed_tasks.forEach(task => { 
            if(task === e.target.parentElement.parentElement.parentElement) {
                completed_tasks.splice(completed_tasks.indexOf(task),1,);
                console.log(task);
            }
        });   
            // remove removedTask from uncompleted_task 
        uncompleted_tasks.forEach(task => { 
            if(task === e.target.parentElement.parentElement.parentElement) {
                console.log(task);
                uncompleted_tasks.splice(uncompleted_tasks.indexOf(task),1,);
            }
            });

        show_tasks();
    }
}


    //chosed filter for tasks:
function chosedFilter(e){   
    show_tasks();
}

    // show the last update of tasks:
function show_tasks(){
        // show task dependen filter
    if(filter.value === "all"){
        tasks_list.innerHTML = "";
        all_tasks.forEach(task => {
            tasks_list.appendChild(task);
        });
    }
    else if(filter.value === "completed"){
        tasks_list.innerHTML = "";
        completed_tasks.forEach(task => {
            tasks_list.appendChild(task);
        });
    }
    else if(filter.value === "uncompleted"){
        tasks_list.innerHTML = "";
        uncompleted_tasks.forEach(task => {
            tasks_list.appendChild(task);
        });
    }

        // update saved_tasks
    savedTasks()
}


    // saved the tasks in the localStorage:
function savedTasks(){
    // update savedTask_all
    const all = [];
    all_tasks.forEach(t => {
        all.push(t.childNodes[1].textContent);
    });
    localStorage.setItem("all_tasks",JSON.stringify(all));

    // update savedTask_completed
    const completed = [];
    completed_tasks.forEach(t => {
        completed.push(t.childNodes[1].textContent);
    });
    localStorage.setItem("completed_tasks",JSON.stringify(completed));

    // update savedTask_uncompleted
    const uncompleted = [];
    uncompleted_tasks.forEach(t => {
        uncompleted.push(t.childNodes[1].textContent)
    });
    localStorage.setItem("uncompleted_tasks",JSON.stringify(uncompleted));
    
}


    // load saved task that save in localStorage befoer:
function load_saved_task(){
    // uncompletedTask_list
const uncompleted = localStorage.getItem("uncompleted_tasks")? JSON.parse( localStorage.getItem("uncompleted_tasks")): [];
uncompleted.forEach(t => {
    const uncom = makeTask(t)
    uncompleted_tasks.push( uncom );
    all_tasks.push(uncom); // add to allTask_array
});
        // completedTask_list   *we shoud add "completed" class here 
    const completed = localStorage.getItem("completed_tasks")? JSON.parse(localStorage.getItem("completed_tasks")): [];
    completed.forEach(t => {
        const com = makeTask(t);
        com.classList.add("completed");
        completed_tasks.push(com);
        all_tasks.push(com);  // add to allTask_array
    });


    show_tasks();
}
