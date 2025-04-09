const cards = document.querySelectorAll('.card')
const columns = document.querySelectorAll('.column')
const apiBackend = "https://tasks-egoe.vercel.app/"

const dragStart = (event) => {
    event.dataTransfer.effectAllowed="move";
    event.dataTransfer.setData("text",event.target.id);
}
const dragOver = (event) => {
    event.preventDefault();
}
const dragEnter = (event) => {
    if(!event.target.classList.contains("column")){return}
    event.target.classList.add('column--enter')
}
const dragLeave = (event) => {
    event.target.classList.remove('column--enter')
}
const drop = (event) => {
   if(event.target.classList.contains('column')){
       const id = event.dataTransfer.getData("text");
       const card = document.querySelector(`#${id}`);
       event.target.appendChild(card);
       event.target.classList.remove('column--enter')
   }
}

cards.forEach((card) => {
    card.addEventListener('dragstart', dragStart);
})
columns.forEach((column) => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    
})


const listTasks = async ()=>{
   const response= await fetch(`${backendApi}/tasks`);
   const tasks = await response.json();
   return tasks;
}

const createdElement = (tag)=>{
   const element =  document.createElement(tag)
   return element;
}

const ListCard = async ()=>{
    const tasks =await listTasks();
    tasks.forEach((task)=>{
        const {id, title, status} = task;
        
        const card = createdElement("div");
        card.draggable=true;
        card.id="card-"+id;
        card.classList.add("card");

        const spanNome = createdElement("span");
        spanNome.innerText =title;
        card.appendChild(spanNome);

        card.addEventListener("dragstart",dragStart);
        const column = document.querySelector('#col1');
        column.appendChild(card);
    })
}

ListCard();