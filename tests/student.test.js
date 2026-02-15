const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../src/models/User');
const Student = require('../src/models/Student');

let token;

describe('Student Endpoints', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);

        // Create user and get token
        await User.deleteMany();
        const userRes = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'studentadmin@example.com',
                password: 'password123',
            });
        token = userRes.body.token;
    });

    afterAll(async () => {
        await Student.deleteMany();
        await User.deleteMany();
        await mongoose.connection.close();
    });

    it('should create a new student', async () => {
        const res = await request(app)
            .post('/api/students')
            .set('Authorization', `Bearer ${token}`)
            .send({
                studentId: 'S12345',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                course: 'Computer Science',
                enrollmentYear: 2024,
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.firstName).toBe('John');
    });

    it('should get all students', async () => {
        const res = await request(app)
            .get('/api/students')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.count).toBeGreaterThan(0);
    });

    it('should fail without token', async () => {
        const res = await request(app)
            .get('/api/students');

        expect(res.statusCode).toEqual(401);
    });
});
