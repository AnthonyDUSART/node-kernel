"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../core/controller"));
const route_1 = __importDefault(require("../core/decorator/route"));
const response_1 = __importDefault(require("../core/response"));
const test_1 = __importDefault(require("../entity/test"));
let TestController = class TestController extends controller_1.default {
    test(arg1, test) {
        return new response_1.default();
    }
    hello(oui) {
        return new response_1.default();
    }
};
__decorate([
    route_1.default({ prefix: "/test", name: "test" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, test_1.default]),
    __metadata("design:returntype", response_1.default)
], TestController.prototype, "test", null);
__decorate([
    route_1.default({ prefix: "/hello", name: "hello" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [test_1.default]),
    __metadata("design:returntype", response_1.default)
], TestController.prototype, "hello", null);
TestController = __decorate([
    route_1.default({ prefix: "/controller", name: "controller_" })
], TestController);
exports.default = TestController;
