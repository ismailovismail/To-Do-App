const inputBtn=document.querySelector('.input-group button')
const clearAllBtn=document.querySelector('.allclear-btn button')
const input=document.querySelector('.input-group input')
const tasklist=document.querySelector('.task-list ul')
let todos
eventlisteners()
loadItems()

function eventlisteners() {
    inputBtn.addEventListener('click',addnewTask)
    clearAllBtn.addEventListener('click',deleteAllItems)
     tasklist.addEventListener('click',deleteItem)
}

function addnewTask() {
 
    if (input.value==='') {
        alert('not value')
    }else{
        createItems(input.value) 
        setItemtoLS(input.value)
        let tasklistChildren=tasklist.children
        document.querySelector('.allclear-btn p').innerHTML=`You have pending ${tasklistChildren.length} tasks`
    }   

input.value=''

}

function loadItems() {
    todos=getItemfromLS()
    todos.forEach(function (item) {
        createItems(item)
    })
}
function getItemfromLS() {
    if (localStorage.getItem('todolist') === null) {
        todos=[]
    }else{
       todos=JSON.parse(localStorage.getItem('todolist'))

    }
    return todos
}
function setItemtoLS(text) {
    todos=getItemfromLS()
    todos.push(text)
    localStorage.setItem('todolist',JSON.stringify(todos))
}

function deleteItemLS(text) {
    todos=getItemfromLS()
    todos.forEach(function(item,index) {
        if (text === item) {
            todos.splice(index,1)
        }
    })
    localStorage.setItem('todolist',JSON.stringify(todos))
}
function createItems(text) {
    const li=document.createElement('li')
    const deleteBtn=document.createElement('button')
    deleteBtn.innerHTML='<i class="fa-solid fa-trash"></i>'
    li.innerHTML=text
    li.appendChild(deleteBtn)
    tasklist.appendChild(li)
}



function deleteItem(e) {
  
    if (e.target.className === 'fa-solid fa-trash') {
        if (confirm('are you sure?')) {
            e.target.parentElement.parentElement.remove()
            deleteItemLS(e.target.parentElement.parentElement.textContent)
            let tasklistChildren=tasklist.children
            document.querySelector('.allclear-btn p').innerHTML=`You have pending ${tasklistChildren.length} tasks`
        }
    }
   
}



function deleteAllItems() {
   tasklist.innerHTML=''
   localStorage.clear()
}




