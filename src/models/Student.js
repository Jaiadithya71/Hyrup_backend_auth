const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // Identification
    studentId: {
        type: String,
        required: [true, 'Please add a Student ID'],
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: [true, 'Please add a first name'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },

    // Academic Info
    course: {
        type: String,
        required: [true, 'Please add a course'],
    },
    enrollmentYear: {
        type: Number,
        required: [true, 'Please add enrollment year'],
    },
    gpa: {
        type: Number,
        min: 0,
        max: 4.0, // Assuming 4.0 scale, can be adjustable
    },
    status: {
        type: String,
        enum: ['Active', 'Graduated', 'Suspended', 'Dropped'],
        default: 'Active',
    },

    // Contact Details
    phone: {
        type: String,
        match: [/^[0-9]{10}$/, 'Please add a valid 10-digit phone number'],
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    emergencyContact: {
        name: String,
        phone: String,
        relation: String,
    },

    // Additional Info
    skills: {
        type: [String],
    },
    notes: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Student', studentSchema);
