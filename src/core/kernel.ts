import KernelError from './error/kernelerror';
import Registry from './registry';
import * as project from "../config/project.json";
import "reflect-metadata"
import HTTPServer from './http/httpserver';


export default class Kernel
{
    private static _registry: Registry;
    private _httpServer: HTTPServer;
    private _booted = false;

    public constructor()
    {
        Kernel._registry = new Registry();
        this._httpServer = new HTTPServer(8081);
        this._booted = false;
    }

    private async load(): Promise<void>
    {
        for(const path of project.paths)
        {
            await Kernel.registry.import(`${process.cwd()}/${path}`);
        }

        for(const controller of Kernel.registry.controllers)
        {
            const controllerRoute = Reflect.getMetadata("controllerRoute", controller)
            const routes = Reflect.getMetadata("routes", controller);

            this.httpServer.listen();
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

    static get registry(): Registry
    {
        return Kernel._registry;
    }

    static set registry(registry: Registry)
    {
        Kernel._registry = registry;
    }

    get httpServer(): HTTPServer
    {
        return this._httpServer;
    }

    set httpServer(httpServer: HTTPServer)
    {
        this._httpServer = httpServer;
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