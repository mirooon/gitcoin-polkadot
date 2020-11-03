"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askForValue = exports.askForAttribute = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
exports.askForAttribute = () => {
    const questions = [
        {
            name: "attribute",
            type: "input",
            message: "Enter block attribute by you want to search block for (hash or number):",
            validate: function (value) {
                if (value === "hash" || value === "number") {
                    return true;
                }
                else {
                    return "Please Enter block attribute (hash or number)";
                }
            },
        },
    ];
    return inquirer_1.default.prompt(questions);
};
exports.askForValue = (isAttributeHash) => {
    const questions = [
        {
            name: "value",
            type: "input",
            message: isAttributeHash ? "Enter block hash" : "Enter block number",
            validate: function (value) {
                if (isAttributeHash) {
                    if (typeof value !== "string") {
                        return "Block hash must be a string";
                    }
                    if (value.length !== 66) {
                        return "Block hash must have 66 characters";
                    }
                }
                else {
                    for (let i = 0; i < value.length; i++) {
                        let digit = parseInt(value[i]);
                        if (Number.isNaN(digit)) {
                            return "Block hash must be a number";
                        }
                    }
                }
                return true;
            },
        },
    ];
    return inquirer_1.default.prompt(questions);
};
