const express = require('express');
const router = express.Router();

let students = [
    { id: 1, name: "Praveen", age: 21, dept: "ECE" },
    { id: 2, name: "Arun", age: 20, dept: "CSE" },
    { id: 3, name: "Divya", age: 19, dept: "IT" }
];

// READ ALL
router.get('/', (req, res) => {
    res.json(students);
});

// READ ONE
router.get('/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    student ? res.json(student) : res.status(404).json({ message: "Not found" });
});

// CREATE
router.post('/', (req, res) => {
    students.push(req.body);
    res.status(201).json(students);
});

// UPDATE ONE
router.put('/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);
    if (index !== -1) {
        students[index] = { ...students[index], ...req.body };
        res.json(students[index]);
    } else {
        res.status(404).json({ message: "Not found" });
    }
});

// UPDATE MULTIPLE
router.put('/', (req, res) => {
    const updates = req.body;
    updates.forEach(u => {
        const index = students.findIndex(s => s.id === u.id);
        if (index !== -1) {
            students[index] = { ...students[index], ...u };
        }
    });
    res.json(students);
});

// DELETE
router.delete('/:id', (req, res) => {
    students = students.filter(s => s.id != req.params.id);
    res.json(students);
});

module.exports = router;
