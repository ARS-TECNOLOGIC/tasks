const updateTask = async ({ id, status, title }) => {
    console.log(`Teste do edit: ${id}, ${title}, ${status}`);
    await fetch(`${backendApi}/tasks/${id}`, {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            title,
            status
        })
    })
    ListCard();
}

const cards = document.querySelectorAll('.card')
const columns = document.querySelectorAll('.column')
const backendApi = "https://tasks-theta.vercel.app"

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
       card.classList.remove(card.classList[1]);
       event.target.appendChild(card);
       event.target.classList.remove('column--enter');
       const classDrop = event.target.classList[1];
       const upDateStatus = (classDrop === "andamento") ? "em andamento" : classDrop;
       card.classList.add(classDrop);
       updateTask({
           id: card.id.split("-")[1],
           status: upDateStatus,
           title: card.querySelector(".titulo-texto").innerText
       });
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
    const columns = document.querySelectorAll(`.column`);
    columns.forEach((column)=>{
        column.innerHTML="";
    });

    tasks.forEach((task)=>{
        const {id, title, status, created_at} = task;
        
        const classStatus = (status === "em andamento") ? "andamento":status;

        const card = createdElement("div");
        card.draggable=true;
        card.id="card-"+id;
        card.classList.add("card");
        card.classList.add(classStatus);

        const divTitulo = createdElement("div");
        divTitulo.classList.add("divTitulo");
        
        const spanIconList = createdElement("span");
        spanIconList.innerHTML = `<span class="material-symbols-outlined"> list_alt </span>`;
        spanIconList.classList.add("icon");
        
        const spanTitulo = createdElement("span");
        spanTitulo.innerText = title;
        spanTitulo.classList.add("titulo-texto");

        divTitulo.appendChild(spanIconList);
        divTitulo.appendChild(spanTitulo);

        card.appendChild(divTitulo);
        
        const spanStatus = createdElement("span");
        spanStatus.classList.add("status");
        spanStatus.id="status-"+id;
        spanStatus.innerText = status.toUpperCase();
        card.appendChild(spanStatus);

        const createdAt = createdElement("div");
        createdAt.classList.add("created-at");
        const date = new Date(created_at).toLocaleString('pt-br', {dateStyle: 'short', timeStyle: 'short'});
        createdAt.innerText = date;
        card.appendChild(createdAt);
        
        card.addEventListener("dragstart",dragStart);
        const column = document.querySelector(`.column.${classStatus}`);
        
        
        column.appendChild(card);
    })
}

ListCard();