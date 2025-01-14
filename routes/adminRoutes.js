const { adminLogin, getAllEmployee, createEmployee, getEmployeeCount, getSalary, deleteEmployee, updateEmployee, singleEmployee, createAttendence, allAttendence, singleAttendence, logout, employeeLogin, getSingleEmployee, getSingleAttendance } = require('../controller/adminController');
const multer =require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});
const upload = multer({ storage: storage });

const router = require('express').Router()
router.route('/createemployee').post(upload.single('image'), createEmployee);
router.route('/admin/login').post(adminLogin);
router.route('/allemployees').get(getAllEmployee);
router.route('/employeecount').get(getEmployeeCount);
router.route('/salary').get(getSalary);
router.route('/delete/:id').delete(deleteEmployee);
router.route('/update/:id').put(updateEmployee)
router.route('/singleemployee/:id').get(getSingleEmployee)
router.route('/newAttendence').post(createAttendence)
router.route('/allAttendence').get(allAttendence)
router.route('/singleAttendence/:id').get(getSingleAttendance);
router.route("/employeelogin").post(employeeLogin)
router.route('/logout').get(logout)
module.exports=router