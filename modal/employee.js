const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    image: {
        public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
    },
    gender: String,
    designation: String,
    department:String,
    salary: Number,
    dateOfJoined: Date,
    deductionForLeave: Number,
    employeeId:String,
    phoneNo:{
        type: Number,
        required: true
    },
    role:{
        type: String,
        default: "employee"
    }
})

// generate token
EmployeeSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},"59112950008",{
        expiresIn: "7d"
    })
}

const employeeModal = mongoose.model("Employee", EmployeeSchema);
module.exports=employeeModal;
