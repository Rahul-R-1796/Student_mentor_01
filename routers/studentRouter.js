const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.post('/create', studentController.createStudent);
router.put('/assign-mentor', studentController.assignMentor);
router.get('/get-students', studentController.getStudents);
router.get('/:studentId/previous-mentor', studentController.getPreviousMentor);

module.exports = router;
