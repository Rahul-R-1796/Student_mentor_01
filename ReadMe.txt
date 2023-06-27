# Mentor and Student API

This API allows you to manage mentors and students, and assign students to mentors.

## Mentor Routes

### Create a Mentor

**Endpoint:** `POST /mentor/create`

Create a new mentor.

### Assign a Student to a Mentor

**Endpoint:** `PUT /mentor/assign-student`

Assign a student to a mentor. Requires `mentorId` and `studentId` in the request body.

### Add Multiple Students to a Mentor

**Endpoint:** `PUT /mentor/add-students`

Add multiple students to a mentor. Requires `mentorId` and `studentIds` (an array of student ids) in the request body.

### Get All Students for a Mentor

**Endpoint:** `GET /mentor/:mentorId/students`

Retrieve all students assigned to a specific mentor. Replace `:mentorId` with the mentor's ID.

## Student Routes

### Create a Student

**Endpoint:** `POST /student/create`

Create a new student.

### Assign or Change Mentor for a Student

**Endpoint:** `PUT /student/assign-mentor`

Assign or change the mentor for a student. Requires `studentId` and `mentorId` in the request body.

### Get All Students without a Mentor

**Endpoint:** `GET /student/get-students`

Retrieve all students without a mentor.

### Get the Previously Assigned Mentor for a Student

**Endpoint:** `GET /student/:studentId/previous-mentor`

Retrieve the previously assigned mentor for a student. Replace `:studentId` with the student's ID.

## Prerequisites

- Node.js
- MongoDB

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure the MongoDB connection in `config/db.js`.
4. Start the server: `npm start`

## Testing the API

You can use tools like Postman or cURL to test the API endpoints.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

Nill