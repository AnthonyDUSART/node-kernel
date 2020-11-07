import Controller from "./controller/controller";
import UnknownObjectError from "./error/unknownobjecterror";

export default class Registry
{
    private _controllers: Array<Object>;

    constructor()
    {
        this._controllers = new Array<Object>();
    }

    public import(object: Object)
    {
        if(object.constructor == Controller)
        {
            this.controllers.push(object);
        }
        else
        {
            throw new UnknownObjectError(object, "Impossible to import unknown object.");
        }
    }

    get controllers(): Array<Object>
    {
        return this._controllers;
    }

    set controllers(controllers: Array<Object>)
    {
        this._controllers = controllers;
    }
}