import Constructable from "./interface/constructableinterface";
import Autoloader from "./autoload";
import Controller from "./controller";
import Entity from "./entity";
import UnknownObjectError from "./error/unknownobjecterror";
import TestController from "../controller/testcontroller";

export default class Registry
{
    private _controllers: Array<Constructable<Controller>>;
    private _entities: Array<Entity>;

    constructor()
    {
        this._controllers = new Array<Constructable<Controller>>();
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
                }
            }
            catch(e)
            {
                console.error(e);
            }
        }
    }

    get controllers(): Array<Constructable<Controller>>
    {
        return this._controllers;
    }

    set controllers(controllers: Array<Constructable<Controller>>)
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