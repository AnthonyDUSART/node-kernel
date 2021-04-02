import KernelError from './error/kernelerror';
import Registry from './registry';
import "reflect-metadata"
import HTTPServer from './http/httpserver';
import {parseConfigFile} from "./utils/file";


export default class Kernel
{
    private static _registry: Registry;
    private static _config: Map<string, any>;
    private _httpServer: HTTPServer;
    private _booted = false;

    public constructor()
    {
        Kernel._registry = new Registry();
        Kernel._config = new Map<string, any>();
        this._httpServer = new HTTPServer(8081);
        this._booted = false;
    }

    private loadConfig()
    {
        try
        {
            Kernel.config.set('typeorm', parseConfigFile("typeorm.yml"));
            Kernel.config.set('twig', parseConfigFile("twig.yml"));
            Kernel.config.set('project', parseConfigFile("project.yml"));
        }
        catch(err)
        {
            console.error(err);
        }
    }

    private async load(): Promise<void>
    {
        this.loadConfig();

        for(const [k, v] of Object.entries(Kernel.config.get('project').paths))
        {
            await Kernel.registry.import(`${process.cwd()}/${v}`);
        }
        
        this.httpServer.listen();
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

    static get config(): Map<string, any>
    {
        return Kernel._config;
    }
}