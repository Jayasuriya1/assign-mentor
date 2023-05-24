const express = require('express')
const router = express.Router()
const taskModule = require('../modules/student-mentor-modules')

//Fetching All Student Details
router.get('/',taskModule.viewStudent)

//Create Student
router.post('/create',taskModule.createStudent)

//Assign Or Change Mentor For Particular Student
router.put('/assignmentor/:id',taskModule.assignMentor)

//Showing Previously Assigned Mentor for Particular Student
router.get('/previousmentor/:id',taskModule.previousMentor)

module.exports=router;