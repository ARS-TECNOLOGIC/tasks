const client = require('./connection');

// Pegar todas as tasks
const getAll = async () => {
    const res = await client.query('SELECT * FROM tasks');
    return res.rows;  // `rows` contém o resultado da consulta no PostgreSQL
};

// Criar uma task nova
const createTask = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES ($1, $2, $3) RETURNING id';
    const res = await client.query(query, [title, 'pendente', dateUTC]);
    return { insertId: res.rows[0].id }; // Recupera o id gerado da inserção
};

// Deletar uma task
const deleteTask = async (id) => {
    const query = 'DELETE FROM tasks WHERE id = $1';
    const res = await client.query(query, [id]);
    return res.rowCount; // Retorna o número de linhas afetadas
};

// Atualizar uma task
const updateTask = async (id, task) => {
    const { title, status } = task;
    const query = 'UPDATE tasks SET title = $1, status = $2 WHERE id = $3';
    const res = await client.query(query, [title, status, id]);
    return res.rowCount; // Retorna o número de linhas afetadas
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};
