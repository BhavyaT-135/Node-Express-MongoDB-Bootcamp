const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//1) Middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello from the middleware😍");
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

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

//2) Route Handlers
const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours,
        }
    });
}

const getTour = (req, res) => {
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
}

const createTour = (req, res) => {
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
}

const updateTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    const updatedTour = Object.assign(tour, req.body);
    res.status(200).json({
        status: 'success',
        data: {
            tour: updatedTour,
        }
    });
}

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    tours = tours.filter(el => el.id !== id);
    res.status(204).json({
        status: 'success',
        data: null,
    });
}

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//3) Routes
app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

//4) Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


