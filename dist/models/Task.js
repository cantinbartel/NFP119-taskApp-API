"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { collection: 'Tasks' });
const Task = (0, mongoose_1.model)('Task', TaskSchema);
exports.Task = Task;
