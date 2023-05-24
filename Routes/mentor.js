const express = require('express')
const router = express.Router()
const taskModule = require('../modules/student-mentor-modules')


//Fetching All Mentor Data
router.get('/',taskModule.viewMentor)

//Creating Mentor
router.post('/create',taskModule.createMentor)

//Assigning Multiple Student For Particular Mentor.
router.put('/assignstudent/:id',taskModule.assginStudent)

// Showing All Student For Praticular Mentor
router.get('/studentdetails/:id',taskModule.getStudentByMentor)

module.exports=router;