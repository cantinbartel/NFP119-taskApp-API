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
exports.getAllUsers = exports.getUserById = exports.addUser = void 0;
const User_1 = require("../models/User");
/* POST - ADD USER */
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.User(req.body);
    try {
        yield user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
});
exports.addUser = addUser;
/* GET USER BY ID */
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.User.findById(id);
        if (!user)
            res.status(404).send({ error: { code: 404, message: 'User not found' } });
        res.json(user);
    }
    catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
});
exports.getUserById = getUserById;
/* GET ALL USERS */
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find();
        users ? res.json(users) : res.status(404).send('No users found');
    }
    catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
});
exports.getAllUsers = getAllUsers;
