"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autoload_1 = __importDefault(require("./autoload"));
const controller_1 = __importDefault(require("./controller"));
const entity_1 = __importDefault(require("./entity"));
const unknownobjecterror_1 = __importDefault(require("./error/unknownobjecterror"));
class Registry {
    constructor() {
        this._controllers = new Array();
        this._entities = new Array();
    }
    async import(...paths) {
        const objects = await autoload_1.default.fromDirectories(...paths);
        for (const object of objects) {
            try {
                const objectDefault = object.default;
                const prototype = objectDefault.prototype;
                switch (true) {
                    case prototype instanceof controller_1.default:
                        this.controllers.push(objectDefault);
                        break;
                    case prototype instanceof entity_1.default:
                        this.entities.push(objectDefault);
                        break;
                    default:
                        throw new unknownobjecterror_1.default(objectDefault, "Impossible to import unknown object.");
                        break;
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    get controllers() {
        return this._controllers;
    }
    set controllers(controllers) {
        this._controllers = controllers;
    }
    get entities() {
        return this._entities;
    }
    set entities(entities) {
        this._entities = entities;
    }
}
exports.default = Registry;
