const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    image: String,
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
const employeeModal = mongoose.model("Employee", EmployeeSchema);
module.exports=employeeModal;
