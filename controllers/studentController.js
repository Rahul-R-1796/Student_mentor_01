const Student = require('../models/student');
const Mentor = require('../models/mentor');

// Create a Student
exports.createStudent = async (req, res) => {
  try {
    const { name } = req.body;

    const student = await Student.create({ name });

    res.status(201).json({ student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Student' });
  }
};

// Assign or Change Mentor for a particular Student
exports.assignMentor = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    const student = await Student.findById(studentId);
    const mentor = await Mentor.findById(mentorId);

    if (!student || !mentor) {
      return res.status(404).json({ error: 'Student or Mentor not found' });
    }

    student.mentor = mentorId;
    await student.save();

    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign mentor' });
  }
};

// Get all students without a mentor
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve students' });
  }
};

// Get the previously assigned mentor for a student
exports.getPreviousMentor = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    let previousMentor = null;
    if (student.mentor) {
      previousMentor = await Mentor.findById(student.mentor);
    }

    res.status(200).json({ previousMentor });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve previous mentor' });
  }
};

module.exports = exports;
