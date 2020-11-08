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

    public async load(): Promise<void>
    {
        for(const path of project.paths)
        {
            await this.registry.import(`${process.cwd()}/${path}`);
        }

        for(const entity of this.registry.entities)
        {
            console.log("###> FIELDS METADATA OF");
            console.log(entity);
            console.log(Reflect.getMetadata("fields", entity));
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