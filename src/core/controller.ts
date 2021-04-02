import Twig from 'twig';
import Response from './http/response/response';
import { Connection } from 'typeorm';
import Entity from './entity';
import Kernel from './kernel';
Twig.cache(false);

export default abstract class Controller
{
    private _connection: Connection;

    constructor(connection: Connection)
    {
        this._connection = connection;
    }

    public renderFile(path: string, parameters: Object = new Object()): string
    {
        var template = Twig.twig({
            path: Kernel.config.get('twig').template.path + path,
            async: false
        });
        return template.render(parameters);
    }

    public render(path: string, parameters: Object = new Object()): Response
    {
        return new Response(200, this.renderFile(path, parameters));
    }

    protected getRepository(entity: Entity)
    {
        return this._connection.getRepository(<any>entity);
    }
}