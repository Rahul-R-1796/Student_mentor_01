const express = require('express');
const mentorController = require('../controllers/mentorController');

const router = express.Router();

router.post('/create', mentorController.createMentor);
router.put('/assign-student', mentorController.assignStudent);
router.put('/add-students', mentorController.addStudents);
router.get('/:mentorId/students', mentorController.getStudentsForMentor);

module.exports = router;
