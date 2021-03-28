"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function field(args) {
    return (target, propertyKey) => {
        if (!Reflect.hasMetadata("fields", target.constructor)) {
            Reflect.defineMetadata("fields", new Array(), target.constructor);
        }
        const field = [{
                name: args.name,
                propertyKey: propertyKey,
                ormtype: args.type,
                type: Reflect.getMetadata("design:type", target, propertyKey)
            }];
        Reflect.defineMetadata("fields", Reflect.getMetadata("fields", target.constructor).concat(field), target.constructor);
    };
}
exports.default = field;
