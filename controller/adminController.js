const employeeModal = require('../modal/employee');
const multer = require("multer");
const path = require("path");
const attendenceModel = require("../modal/Attendence");
const mongoose = require('mongoose');
// Multer disk storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images'); // Destination folder for storing images
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// create employee 
exports.createEmployee = async (req, res) => {
    try {
        const { name, email, password, address, salary, gender, designation, dateOfJoined, phoneNo, department, deductionForLeave } = req.body;

        // Check if req.file exists (uploaded file)
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required." });
        }

        const newEmployee = new employeeModal({
            name, email, image: req.file.filename, password, address, salary, gender, designation, dateOfJoined, phoneNo, department, deductionForLeave
        });

        await newEmployee.save();

        return res.status(201).json({ message: "Employee created successfully" });
    } catch (error) {
        console.error("Error creating employee:", error);
        return res.status(400).json({ error: "Failed to create employee" });
    }
};

// admin login
exports.adminLogin = async(req,res) =>{
    try {
        if(req.body.email === "mudassar@gmail.com" && req.body.password === "mudassar"){
         res.status(200).json({ success: true, status : "success"})
        }else{
            res.status(400).json({Error : "Invalid password or email"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({Error : "Error in login"})
    }
}
// all Employee
exports.getAllEmployee = async(req,res) =>{
    try {
        const allEmployees = await employeeModal.find({role : "employee"});
        res.status(200).json(allEmployees);
    } catch (error) {
        console.log(error);
        res.status(400).json({Error : "Employees not found"})
    }
}

//employee count
exports.getEmployeeCount = async(req,res) =>{
    try {
        const totalEmployee = await employeeModal.find({role : "employee"});
        res.status(200).json(totalEmployee.length);
    } catch (error) {
        console.log(error);
        res.status(400).json({Error : "Employees not found"})
    }
}
// get total salary
exports.getSalary = async(req,res)=>{
    try {
        const employees = await employeeModal.aggregate([
            {
                $match : {role : "employee"}
            },
            {
                $group:{
                    _id : null,
                    sumOfSalary : {$sum: "$salary" }
                }
            }
        ])
        if(employees.lenght === 0){
            return res.json({sumOfSalary : 0})
        }
        return res.status(200).json({sumOfSalary : employees[0].sumOfSalary})
    } catch (error) {
        res.status(400).json({Error : "something wrong in salary counting"})
    }
}
// delete employee
exports.deleteEmployee = async(req,res)=>{
    try {
        const id =req.params.id;
        const employeeDeleted = await employeeModal.findByIdAndDelete(id);
         if(!employeeDeleted){
            res.status(404).json("Employee not found")
         }
        return res.status(200).json("Employee deleted successfully")
    } catch (error) {
        res.status(400).json({Error :" Something wrong in querry"})
    }
}
// update Employee
exports.updateEmployee = async(req,res)=>{
    try {
        const {
            name,
            email,
            address,
            salary,
            gender,
            designation,
            dateOfJoined,
            phoneNo,
            department,
            deductionForLeave,
          } = req.body;
          const updateEmployee = {
            name,
            email,
            address,
            salary,
            gender,
            designation,
            dateOfJoined,
            phoneNo,
            department,
            deductionForLeave,
          };
          await employeeModal.findByIdAndUpdate(req.params.id, updateEmployee)
        return res.status(200).json({message:"Employee update successfully", updateEmployee})
    } catch (error) {
        res.status(400).json("something wrong in querry")
        
    }
}
// get single employee
exports.getSingleEmployee = async (req, res) => {
    try {
      const employee = await employeeModal.findById(req.params.id);
      return res.json({ employee });
    } catch (error) {
      return res.json({ Error: "error" });
    }
  };
//employee login 
 exports.employeeLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const employee = await employeeModal.findOne({email, password});
        if(!employee){
            return res.status(200).json("Employee not found")
        }
        return res.status(200).json({message:"Login Successfully",employeeId : employee._id })
    } catch (error) {
        res.status(400).json("Login Failed")
    }
 }

 //Create Attendence
 exports.createAttendence = async(req,res)=>{
    try {
        const {employeeId ,date,status} = req.body;
        const newAttendence = new attendenceModel( {
            employeeId: employeeId,
            date: date,
            status: status
        })
        await newAttendence.save();
        return res.status(200).json("Attendence created successfully")
    } catch (error) {
        res.status(400).json("Attendence not created")
        
    }
 }
 //for check all attendence
 exports.allAttendence = async(req,res)=>{
    try {
        const attendence = await attendenceModel.find({})
        return res.status(200).json(attendence);
    } catch (error) {
        res.status(400).json("Some thing wrong in querry")
    }
 }
 exports.getSingleAttendance = async (req, res) => {
    const { id } = req.query;
    try {
      // Retrieve all attendance records for the specified employee ID
      const attendance = await attendenceModel.find({
        employeeId: id,
      });
  
      // If no attendance records found, send an appropriate response
      if (attendance.length === 0) {
        return res.json({ status: "No attendance records found", attendance });
      }
  
      // Send the attendance records in a simple array format
      return res.json({ attendance });
    } catch (err) {
      console.log(err);
      return res.json({ status: "Error", error: "Error in running query" });
    }
  };
  

 // logout
 exports.logout = async(req,res)=>{
    return res.status(200).json({ Status: "Success" })
 }

 //employee login
 exports.employeeLogin = async(req,res)=>{
    try {
        const employee = await employeeModal.findOne({email: req.body.email});
        if(!employee){
            return res.status(400).json({ status: "error", error: "Invalid credentials" })
        }
        if(req.body.password.toString() !== employee.password){
            return res.status(401).json({ status: "error", error: "Invalid credentials" });
        }
        return res.status(200).json({status: "success", id: employee._id})
    } catch (error) {
        return res.json({ Status: "Error", Error: "Error in running query" });
        
    }
 }