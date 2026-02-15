const express = require('express');
const router = express.Router();
const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Protect all routes

router.route('/').get(getStudents).post(createStudent);

router
    .route('/:id')
    .get(getStudent)
    .put(updateStudent)
    .delete(deleteStudent);

module.exports = router;
