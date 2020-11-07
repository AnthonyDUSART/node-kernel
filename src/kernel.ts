
import Autoloader from './autoload';
import Controller from './controller/controller';
import KernelError from './error/kernelerror';
import UnknownObjectError from './error/unknownobjecterror';
import Registry from './registry';



export default class Kernel
{
    private _registry: Registry;
    private _booted = false;

    public constructor()
    {
        this._registry = new Registry();
        this._booted = false;
    }

    public async load(): Promise<void>
    {
        try
        {
            const controllers = await Autoloader.fromDirectories(`${__dirname}/controller`);
            for(const controller of controllers)
            {
                this.registry.import(controller);
            }
        }
        catch(e: any)
        {
            console.error(e);
        }


    }

    public boot()
    {
        if(this.booted)
        {
            throw new KernelError("Kernel is already booted.");
        }

        this.load();

        this.booted = true;
    }

    get registry(): Registry
    {
        return this._registry;
    }

    set registry(registry: Registry)
    {
        this._registry = registry;
    }

    get booted(): boolean
    {
        return this._booted;
    }

    set booted(booted: boolean)
    {
        this._booted = booted;
    }
}