const fs = require('fs');
const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello World from the Server Side!',
//         app: 'Natours',
//     });
// });

// app.post('/', (req, res) => {
//     res.status(200).send('You can post to this endpoint!');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        }
    });
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


