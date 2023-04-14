"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskByUserId = exports.getTaskById = exports.getAllTasks = exports.addTask = void 0;
const Task_1 = require("../models/Task");
/* POST - ADD TASK */
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new Task_1.Task(req.body);
    try {
        yield task.save();
        res.json(task);
    }
    catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
});
exports.addTask = addTask;
/* GET ALL TASKS */
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.Task.find().populate('user', 'name email');
        tasks ? res.json(tasks) : res.status(404).send('No tasks found');
    }
    catch (e) {
        res.status(500).send('Server Error');
    }
});
exports.getAllTasks = getAllTasks;
/* GET TASK BY ID */
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task_1.Task.findById(id).populate('user', 'name email');
        task ? res.json(task) : res.status(404).send({ error: {
                code: 404,
                message: 'Task not found'
            } });
    }
    catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
});
exports.getTaskById = getTaskById;
/* GET TASKS REALATED TO A USER */
const getTaskByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const tasks = yield Task_1.Task.find({ user: userId });
        tasks ? res.json(tasks) : res.status(404).send({ error: {
                code: 404,
                message: 'Tasks not found'
            } });
    }
    catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
});
exports.getTaskByUserId = getTaskByUserId;
/* PUT - UPDATE TASK */
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield Task_1.Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!updatedTask)
            res.status(404).send('Task not found');
        res.status(200).json({ message: 'Task updated', updatedTask });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`Error: ${error}`);
    }
});
exports.updateTask = updateTask;
/* DELETE TASK */
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTask = yield Task_1.Task.findByIdAndDelete(req.params.id).exec();
        if (!deletedTask)
            res.send('Task not found');
        res.status(200).json({ message: 'Task deleted', deleteTask: exports.deleteTask });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`Error: ${error}`);
    }
});
exports.deleteTask = deleteTask;
