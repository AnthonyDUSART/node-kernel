import KernelError from '@node-kernel/core/src/error/kernelerror';
import Registry from '@node-kernel/core/src/registry';
import * as project from "@node-kernel/core/src/config/project.json";


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
            await this.registry.import(__dirname + path);
        }

        console.log(this.registry);
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