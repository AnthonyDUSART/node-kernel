import Autoloader from "./autoload";
import Controller from "./controller/controller";
import Entity from "./entity/entity";
import UnknownObjectError from "./error/unknownobjecterror";

export default class Registry
{
    private _controllers: Array<Controller>;
    private _entities: Array<Entity>;

    constructor()
    {
        this._controllers = new Array<Controller>();
        this._entities = new Array<Entity>();
    }

    public async import(...paths: string[])
    {
        const objects = await Autoloader.fromDirectories(...paths);

        for(const object of objects)
        {
            try
            {
                const objectDefault = object.default;
                const prototype = objectDefault.prototype;
        
                switch (true)
                {
                    case prototype instanceof Controller:
                        this.controllers.push(objectDefault);
                        break;
                    
                    case prototype instanceof Entity:
                        this.entities.push(objectDefault);
                        break;
        
                    default:
                        throw new UnknownObjectError(objectDefault, "Impossible to import unknown object.");
                        break;
                }
            }
            catch(e)
            {
                console.error(e);
            }
        }
    }

    get controllers(): Array<Controller>
    {
        return this._controllers;
    }

    set controllers(controllers: Array<Controller>)
    {
        this._controllers = controllers;
    }

    get entities(): Array<Entity>
    {
        return this._entities;
    }

    set entities(entities: Array<Entity>)
    {
        this._entities = entities;
    }
}