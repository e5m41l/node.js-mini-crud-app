const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json());

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];

app.get('/', (req, res)=>{
    res.send('Home Page:)');
});

// GET all courses
app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

// GET course by id
app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));

    if (!course) return res.status(404).send('course was not found!');

    res.send(course);
});

// POST a course
app.post('/api/courses', (req, res)=>{

    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);

    res.send(course);
});


// PUT a course
app.put('/api/courses/:id', (req, res)=>{
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = courses.find(c=>c.id===parseInt(req.params.id));

    if (!course) return res.status(404).send('course was not found!');

    course.name = req.body.name;

    res.send(course);
});


// DELETE course
app.delete('/api/courses/:id', (req, res)=>{
    // find the course
    const course = courses.find(c=>c.id===parseInt(req.params.id));

    if (!course) return res.status(404).send('course was not found!');

    // delete the course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return it

    res.send(course);
});

function validateCourse (course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

const PORT = process.env.PORT || 3000;

app.listen(3000, ()=>console.log(`Listening on port ${PORT}...`));