"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kernelerror_1 = __importDefault(require("./error/kernelerror"));
const registry_1 = __importDefault(require("./registry"));
const project = __importStar(require("../config/project.json"));
require("reflect-metadata");
class Kernel {
    constructor() {
        this._booted = false;
        this._registry = new registry_1.default();
        this._booted = false;
    }
    async load() {
        for (const path of project.paths) {
            await this.registry.import(`${process.cwd()}/${path}`);
        }
        for (const controller of this.registry.controllers) {
            const controllerRoute = Reflect.getMetadata("controllerRoute", controller);
            const routes = Reflect.getMetadata("routes", controller);
            console.log(controllerRoute);
            for (const route of routes) {
                console.log(route);
            }
        }
    }
    async boot() {
        if (this.booted) {
            throw new kernelerror_1.default("Kernel is already booted.");
        }
        await this.load();
        this.booted = true;
    }
    get registry() {
        return this._registry;
    }
    set registry(registry) {
        this._registry = registry;
    }
    get booted() {
        return this._booted;
    }
    set booted(booted) {
        this._booted = booted;
    }
}
exports.default = Kernel;
