const mongoose = require('mongoose')
const validator = require('validator')

mentorSchema = new mongoose.Schema(
    {
        mentor_id:{type:String,required:true},
        mentor_name:{type:String,required:true},
        email:{
            type:String,
            required:true,
            lowercase:true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        mobile:{type:String,default:'000-000-0000'},
        course:{type:String,required:true},
        student_id:{type:Array,default: []}
    }
)

let mentorModel=mongoose.model('mentor',mentorSchema)

studentSchema = new mongoose.Schema(
    {
        student_id:{type:String,required:true},
        student_name:{type:String,required:true},
        email:{
            type:String,
            required:true,
            lowercase:true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        mobile:{type:String,default:'000-000-0000'},
        course:{type:String,required:true},
        mentor_id:{type:String,default:''},
        old_mentor_id:{type:String,default:''}
    }
)

let studentModel=mongoose.model('student',studentSchema)

module.exports={mentorModel,studentModel}
