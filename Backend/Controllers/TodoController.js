let { todoModel } = require("../Models/TodoModel");

const SUCCESS = "success";
const FAIL = "fail";

exports.getTodos = async (req, res) => {
    try {
        let todos = await todoModel.find();
        res.status(200).json({
            status: SUCCESS,
            data: todos,
        });
    } catch (err) {
        res.status(500).json({
            status: FAIL,
            message: err.message,
        });
    }
};

exports.postTodo = async (req, res) => {
    try {
        let todo = await todoModel.create(req.body);
        res.status(200).json({
            status: SUCCESS,
            data: todo,
        });
    } catch (err) {
        res.status(500).json({
            status: FAIL,
            message: err.message,
        });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        let todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: SUCCESS,
            data: todo,
        });
    } catch (err) {
        res.status(500).json({
            status: FAIL,
            message: err.message,
        });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        let todo = await todoModel.findByIdAndDelete(req.params.id);  // Use req.params.id for the ID
        res.status(200).json({
            status: SUCCESS,
            data: todo,
        });
    } catch (err) {
        res.status(500).json({
            status: FAIL,
            message: err.message,
        });
    }
};
