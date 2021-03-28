"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnknownObjectError extends Error {
    constructor(object, message) {
        super(message);
        this._object = object;
    }
    get object() {
        return this._object;
    }
    set object(object) {
        this._object = object;
    }
}
exports.default = UnknownObjectError;
