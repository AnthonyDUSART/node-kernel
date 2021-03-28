"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}
function route(args) {
    return (target, propertyKey, descriptor) => {
        if (propertyKey == undefined) {
            /**
             * Controller decorator
             */
            if (!Reflect.hasMetadata("routes", target)) {
                Reflect.defineMetadata("routes", new Array(), target);
            }
            const route = {
                prefix: args.prefix,
                name: args.name
            };
            Reflect.defineMetadata("controllerRoute", route, target);
        }
        else {
            /**
             * Method decorator
             */
            if (!Reflect.hasMetadata("routes", target.constructor)) {
                Reflect.defineMetadata("routes", new Array(), target.constructor);
            }
            const methodArguments = new Array();
            const params = Reflect.getMetadata('design:paramtypes', target, propertyKey);
            let paramsName = getParamNames(descriptor.value);
            const returnType = Reflect.getMetadata('design:returntype', target, propertyKey);
            paramsName.forEach((paramName, k) => {
                const argument = {
                    name: paramName,
                    type: params[k]
                };
                methodArguments.push(argument);
            });
            const route = [{
                    prefix: args.prefix,
                    name: args.name,
                    propertyKey: propertyKey,
                    args: methodArguments,
                    returnType: returnType
                }];
            Reflect.defineMetadata("routes", Reflect.getMetadata("routes", target.constructor).concat(route), target.constructor);
        }
    };
}
exports.default = route;
