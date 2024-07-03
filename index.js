const express = require('express');
const app = express();

app.use(express.json());

let courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    console.log(req.body);
    let singleCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(singleCourse);
    res.send(courses);
});

app.put('/courses/:id', (req, res) => {
    try {
        let singleCourse = courses.find(c => c.id === +req.params.id);

        if (!singleCourse) {
            return res.status(404).send('The course with the given ID was not found');
        }

        singleCourse.name = req.body.name;
        res.send(singleCourse);
    } catch (err) {
        res.status(500).send('Invalid ID');
    }
});

app.delete('/courses/:id', (req, res) => {
    try {
        let singleCourse = courses.find(c => c.id === +req.params.id);

        if (!singleCourse) {
            return res.status(404).send('The course with the given ID was not found');
        }

        const index = courses.indexOf(singleCourse);
        courses.splice(index, 1);
        res.send(singleCourse);
    } catch (err) {
        res.status(500).send('Invalid ID');
    }
});

app.listen(3000, () => 
    console.log('Server started on port 3000...')
);
