import Entity from "../entity";
import "reflect-metadata";

interface FieldDefinition
{
    name: string,
    propertyKey: string,
    ormtype: string,
    type: Function
}

export default function field(args: any)
{
    return (target: Entity, propertyKey: string) =>
    {

        if(!Reflect.hasMetadata("fields", target.constructor))
        {
            Reflect.defineMetadata("fields", new Array<FieldDefinition>(), target.constructor);
        }

        const field: Array<FieldDefinition> = [{
            name: args.name,
            propertyKey: propertyKey,
            ormtype: args.type,
            type: Reflect.getMetadata("design:type", target, propertyKey)
        }];

        Reflect.defineMetadata(
            "fields",
            Reflect.getMetadata("fields", target.constructor).concat(field),
            target.constructor
        );
    }
}