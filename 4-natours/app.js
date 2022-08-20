const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World from the Server Side!',
        app: 'Natours',
    });
});

app.post('/', (req, res) => {
    res.status(200).send('You can post to this endpoint!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


