const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputAddTask = document.querySelector('.inputAddTask');
const backendApi = "https://tasks-theta.vercel.app"

const addTask = async (event) => {
    event.preventDefault();
    const titleTask = inputAddTask.value;

    await fetch(`${backendApi}/tasks`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            title: titleTask
        })
    });
    loadTasks();
    inputAddTask.value = '';
}

const deleteTask = async (idTask) => {
    console.log('Delete foi acionado: ' + idTask);
    await fetch(`${backendApi}/tasks/${idTask}`, {
        method: 'DELETE'
    });
    loadTasks();
}

const updateTask = async ({ id, status, title }) => {
    console.log(`Teste do edit: ${id}, ${title}, ${status}`);
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            title,
            status
        })
    })
    loadTasks();
}

const fetchTasks = async () => {
    const response = await fetch(`${backendApi}/tasks`);
    const tasks = await response.json();
    return tasks;
}

const createSelect = (value) => {
    const options = `
    <option value="pendente">Pendente</option>
    <option value="em andamento">Em Andamento</option>
    <option value="concluida">Concluida</option>
    `;

    const select = createElement('select', '', options);
    select.value = value;
    return select;
}

const createElement = (tag, innerText = '', innerHtml = '') => {
    const element = document.createElement(tag);

    if (innerText) {
        element.innerText = innerText;
    }

    if (innerHtml) {
        element.innerHTML = innerHtml;
    }
    return element;
}

const formatDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' };
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    console.log(date);
    return date;
}

const createRow = (task) => {
    const { id, title, created_at, status } = task;

    const dateLocale = formatDate(created_at)

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', dateLocale);
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);
    const editButton = createElement('button', '', '<span class="material-symbols-outlined"> edit </span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined"> delete </span>');

    const editForm = createElement('form');
    const editInput = createElement('input');
    editInput.value = title;
    editForm.appendChild(editInput);

    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    tdStatus.appendChild(select);
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    // editButton.addEventListener('click', () => editTask(id));
    deleteButton.addEventListener('click', () => deleteTask(id));
    select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value }));
    editButton.addEventListener('click', () => {
        tdTitle.innerText = "";
        tdTitle.appendChild(editForm);
    })
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateTask({ id, status, title: editInput.value });
    })
    return tr;
}

const loadTasks = async () => {
    const tasks = await fetchTasks();
    tbody.innerHTML = ""
    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask)

loadTasks();
