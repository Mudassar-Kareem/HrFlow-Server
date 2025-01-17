const { adminLogin, getAllEmployee, createEmployee, getEmployeeCount, getSalary, deleteEmployee, updateEmployee, singleEmployee, createAttendence, allAttendence, singleAttendence, logout, employeeLogin, getSingleEmployee, getSingleAttendance } = require('../controller/adminController');
const express = require("express");
const router = express.Router();


router.route('/createemployee').post(createEmployee);
router.post('/admin/login',adminLogin);
router.post("/employeelogin",employeeLogin);
router.route('/allemployees').get(getAllEmployee);
router.route('/employeecount').get(getEmployeeCount);
router.route('/salary').get(getSalary);
router.route('/delete/:id').delete(deleteEmployee);
router.route('/update/:id').put(updateEmployee)
router.route('/singleemployee/:id').get(getSingleEmployee)
router.route('/newAttendence').post(createAttendence)
router.route('/allAttendence').get(allAttendence)
router.route('/singleAttendence/:id').get(getSingleAttendance);

router.route('/logout').get(logout)
module.exports=router