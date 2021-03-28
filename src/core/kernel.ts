import KernelError from './error/kernelerror';
import Registry from './registry';
import * as project from "../config/project.json";
import "reflect-metadata"


export default class Kernel
{
    private _registry: Registry;
    private _booted = false;

    public constructor()
    {
        this._registry = new Registry();
        this._booted = false;
    }

    private async load(): Promise<void>
    {
        for(const path of project.paths)
        {
            await this.registry.import(`${process.cwd()}/${path}`);
        }

        for(const controller of this.registry.controllers)
        {
            const controllerRoute = Reflect.getMetadata("controllerRoute", controller)
            const routes = Reflect.getMetadata("routes", controller);
            console.log(controllerRoute);
            for(const route of routes)
            {
                console.log(route);
            }
        }
    }

    public async boot(): Promise<void>
    {
        if(this.booted)
        {
            throw new KernelError("Kernel is already booted.");
        }

        await this.load();

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