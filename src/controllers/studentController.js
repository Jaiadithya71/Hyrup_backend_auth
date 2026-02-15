const Student = require('../models/Student');
const Joi = require('joi');

// @desc    Get all students
// @route   GET /api/students
// @access  Private
const getStudents = async (req, res) => {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    // Finding resource
    query = Student.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Student.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const students = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    res.status(200).json({
        success: true,
        count: students.length,
        pagination,
        data: students,
    });
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            res.status(404);
            throw new Error(`Student not found with id of ${req.params.id}`);
        }

        res.status(200).json({ success: true, data: student });
    } catch (err) {
        res.status(404);
        throw new Error(`Student not found with id of ${req.params.id}`);
    }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Private
const createStudent = async (req, res) => {
    // Basic Joi validation
    const schema = Joi.object({
        email: Joi.string().email().required(),
        studentId: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        course: Joi.string().required(),
        enrollmentYear: Joi.number().required(),
    }).unknown(true);

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
    }

    const student = await Student.create(req.body);

    res.status(201).json({
        success: true,
        data: student,
    });
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
const updateStudent = async (req, res) => {
    let student = await Student.findById(req.params.id);

    if (!student) {
        res.status(404);
        throw new Error(`Student not found with id of ${req.params.id}`);
    }

    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true, data: student });
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private
const deleteStudent = async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (!student) {
        res.status(404);
        throw new Error(`Student not found with id of ${req.params.id}`);
    }

    await student.deleteOne();

    res.status(200).json({ success: true, data: {} });
};

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
};
