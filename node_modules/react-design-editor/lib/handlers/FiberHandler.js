"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomHandler_1 = __importDefault(require("./CustomHandler"));
class FiberHandler extends CustomHandler_1.default {
    initialze() {
        this.handler.canvas.on('mouse:down', this.mousedown);
    }
    mousedown(opt) {
        const { subTargets } = opt;
        if (subTargets.length) {
            const target = subTargets[0];
            console.log(target);
            if (target.type === 'container') {
            }
            else if (target.type === 'coreContainer') {
            }
        }
    }
}
exports.default = FiberHandler;
