const fs = require('fs');
const express = require('express');

const app = express();

//Middleware
app.use(express.json());

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

app.get('/api/v1/tours/:id', (req, res) => {
    //Multiply by 1 to convert to number
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: tour,
        }
    });
})

app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body);

    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newID }, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            }
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


