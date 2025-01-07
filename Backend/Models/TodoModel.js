let mongoose = require("mongoose");
const { type } = require("os");
let todoSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"name is manidate"],
    },
    description : {
        type : String,
        required : [true, "description is manidate"],
    },
    done : {
        type : Boolean,
        reqired : [true, "done is manidate"],
        default : false,
    },
});
let todoModel = mongoose.model("task", todoSchema);
module.exports = {todoModel};
