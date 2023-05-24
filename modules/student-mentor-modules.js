const { default: mongoose } = require("mongoose")
const { mentorModel,studentModel } = require("../Schemas/schema")

//Create Mentor
exports.createMentor = async(req,res)=>{
   try {
      let mentor = await mentorModel.findOne({email:req.body.email})
      console.log(`email:${req.body.email}`)
      console.log(mentor)
      if(!mentor){
         let mentor = await mentorModel.create(req.body)
         res.status(200).send({
            message:"Mentor Created Successfull"
         })
      }else{
         res.status(400).send({
            message:"Mentor Already Exist"
         })
      }
   } catch (error) {
      res.status(500).send({
         message:"Internal Server Error",
         error
      })
   }
}

//Create Student
exports.createStudent = async(req,res)=>{
   try {
      let student = await studentModel.findOne({email:req.body.email})
      console.log(`email:${req.body.email}`)
      console.log(student)
      if(!student){
         let student = await studentModel.create(req.body)
         res.status(200).send({
            message:"Student Created Successfull"
         })
      }else{
         res.status(400).send({
            message:"Student Already Exist"
         })
      }
   } catch (error) {
      res.status(500).send({
         message:"Internal Server Error",
         error
      })
   }
}

//Fetching All Students Data
exports.viewStudent = async(req,res) => {
   try {
      const student = await studentModel.find()
      res.status(200).send({
         student,
         message:"student data fetched successfully"
      })
   } catch (error) {
      res.status(500).send({
         message:"Internal Server Error",
         error
      })
   }
}

//Fetching All Mentors Data
exports.viewMentor = async(req,res) => {
   try {
      const mentor = await mentorModel.find()
      res.status(200).send({
         mentor,
         message:"mentor data fetched successfully"
      })
   } catch (error) {
      res.status(500).send({
         message:"Internal Server Error",
         error
      })
   }
}

//Assigning Multiple Student For Particular Mentor.
exports.assginStudent = async(req,res) => {
   try {
      const mentor = await mentorModel.findOne({mentor_id:req.params.id})
      const data = mentor.student_id
      if(mentor){
         mentor.student_id = req.body.student_id
         await mentor.save()
         data.forEach(async(element) => {
            const selectedStudent = await studentModel.findOne({student_id:element})
            selectedStudent.mentor_id = req.params.id
            await selectedStudent.save()
         });
         res.status(200).send({
            message:"Student Assigned To Mentor Successfully"
         })
      }else(
         res.status(400).send({
            message:"Mentor Does't Exist"
         })
      )
     
   } catch (error) {
      res.status(500).send({
         message:"Internal Server Error",
         error
      })
   }
}

// Showing All Student For Praticular Mentor
exports.getStudentByMentor = async(req,res)=>{
   try {
      const mentor = await mentorModel.findOne({mentor_id:req.params.id})
      if(mentor){ 
         const studentId = mentor.student_id
         const studentDetails = await studentModel.find()
         const data = studentDetails.filter((ele) =>{
               return  studentId.includes(ele.student_id);
         } )
         res.status(200).send({
            data,
            message:"Student Data fetched successfully"
         })
      }else{
         res.status(400).send({
            message:"Mentor Does't Exist"
         })
      }
   } catch (error) {
      res.status(500).send({
         message:"Internal Server Error",
         error
      })
   }
}

//Assign Or Change Mentor For Particular Student
exports.assignMentor = async(req,res)=>{
   try {
      const student =  await studentModel.findOne({student_id:req.params.id})
      
      if(student){
         if(student.mentor_id == ""){
               student.mentor_id = req.body.mentor_id
               await student.save()
               const mentor = await mentorModel.findOne({mentor_id:student.mentor_id})
               studentId = mentor.student_id
               mentor.student_id = [...studentId,req.params.id]
               await mentor.save()

         }else{

            student.old_mentor_id = student.mentor_id
            student.mentor_id = req.body.mentor_id
            await student.save()

            const mentor = await mentorModel.findOne({mentor_id:student.mentor_id})
            studentId = mentor.student_id
            mentor.student_id = [...studentId,req.params.id]
            await mentor.save()

            const oldMentor = await mentorModel.findOne({mentor_id:student.old_mentor_id})
            const oldMentorStudent = oldMentor.student_id
            const data = oldMentorStudent.filter((ele)=> ele != req.params.id)
            oldMentor.student_id = data
            await oldMentor.save()
            
         }
         
         res.status(200).send({
            message:"Mentor assigned Successfully"
         })
      }else{
         res.status(400).send({
            message:"Student Dose't Exist"
         })
      }
      
   } catch (error) {
      res.status(500).send({
         message:"Internal Server Error",
         error
      })
   }
}

//Showing Previously Assigned Mentor for Particular Student
exports.previousMentor = async(req,res) => {
   try {
      const student = await studentModel.findOne({student_id:req.params.id})
      if(student){
         if(student.old_mentor_id !== ""){
            const mentor = await mentorModel.findOne({mentor_id:student.old_mentor_id})
            res.status(200).send({
               mentor,
               message:"Previous Mentor Data Fetched Successfully"
            })
         }else{
            res.status(400).send({
               message:"There Is No Previous Mentor For This Student"
            })
         }
      }else{
         res.status(400).send({
            message:"Student Does't Exist"
         })
      }
   } catch (error) {
      res.status(500).send({
         message:"Internal Server Error",
         error
      })
   }
}