const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(bodyParser.json());
let todos = [];
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const newTodo = { id: uuidv4(), title, description, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
