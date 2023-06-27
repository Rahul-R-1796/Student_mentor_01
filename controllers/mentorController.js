const Mentor = require('../models/mentor');
const Student = require('../models/student');

// Create a Mentor
exports.createMentor = async (req, res) => {
  try {
    const { name } = req.body;

    const mentor = await Mentor.create({ name });

    res.status(201).json({ mentor });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Mentor' });
  }
};

// Assign a student to Mentor
exports.assignStudent = async (req, res) => {
  try {
    const { mentorId, studentId } = req.body;

    const mentor = await Mentor.findById(mentorId);
    const student = await Student.findById(studentId);

    if (!mentor || !student) {
      return res.status(404).json({ error: 'Mentor or Student not found' });
    }

    student.mentor = mentorId;
    await student.save();

    mentor.students.push(studentId);
    await mentor.save();

    res.status(200).json({ mentor, student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign student to mentor' });
  }
};

// Add multiple students to Mentor
exports.addStudents = async (req, res) => {
  try {
    const { mentorId, studentIds } = req.body;

    const mentor = await Mentor.findById(mentorId);
    const students = await Student.find({ _id: { $in: studentIds } });

    if (!mentor || students.length !== studentIds.length) {
      return res.status(404).json({ error: 'Mentor or Students not found' });
    }

    students.forEach((student) => {
      student.mentor = mentorId;
      student.save();
    });

    mentor.students.push(...studentIds);
    await mentor.save();

    res.status(200).json({ mentor, students });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add students to mentor' });
  }
};

// Get all students for a particular mentor
exports.getStudentsForMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await Mentor.findById(mentorId).populate('students');
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    const students = mentor.students;

    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve students for mentor' });
  }
};

module.exports = exports;
