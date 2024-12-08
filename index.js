const express = require('express');

const PORT = 3000;

const app = express();
app.use(express.json());

const tasks = [
    {
        id: 0,
        name: 'Example task',
        body: 'This is an example task',
        // deadline: 0, // Unix timestamp
        status: 'TODO', // Can be 'TODO', 'IN_PROGRESS', 'DONE'
    }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/echo', (req, res) => {
    res.send(`You sent: "${req.body}"`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
