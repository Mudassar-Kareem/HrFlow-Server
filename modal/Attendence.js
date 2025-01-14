const mongoose = require("mongoose");
const attendenceSchema =  new mongoose.Schema({
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    date:{
        type:String,
        required: true
    },
    status: String
})
const attendenceModel =  mongoose.model("Attendence", attendenceSchema);
module.exports= attendenceModel;