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
const field_1 = __importDefault(require("../core/decorator/field"));
const entity_1 = __importDefault(require("../core/entity"));
class Test extends entity_1.default {
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get message() {
        return this._message;
    }
    set message(message) {
        this._message = message;
    }
}
__decorate([
    field_1.default({ name: "id", type: "integer" }),
    __metadata("design:type", Number)
], Test.prototype, "_id", void 0);
__decorate([
    field_1.default({ name: "message", type: "string" }),
    __metadata("design:type", String)
], Test.prototype, "_message", void 0);
__decorate([
    field_1.default({ name: "test", type: "OneToMany" }),
    __metadata("design:type", Test)
], Test.prototype, "_test", void 0);
exports.default = Test;
