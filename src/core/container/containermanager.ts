import Request from "../http/request/request";
import Response from "../http/response/response";
import EntityFactory from "./entityfactory";
import {Connection, createConnection, EntitySchema} from "typeorm"
import Entity from "../entity";
import Kernel from "../kernel";

export default abstract class ContainerManager
{

    public static async invoke(request: Request, controller: any, route: any, data: any): Promise<Response>
    {
        let result: Response;
        try
        {
            const typeorm_config = Kernel.config.get('typeorm');
            console.log(typeorm_config.url);
            const connection = <Connection>await createConnection({
                type: typeorm_config.type,
                url: typeorm_config.url,
                useNewUrlParser: true,
                entities: <EntitySchema<Entity>[]>Kernel.registry.entities,
                synchronize: typeorm_config.synchronize,
                logging: typeorm_config.logging,
                useUnifiedTopology: typeorm_config.useUnifiedTopology,
            });
            const instance = new controller(connection);
            const args = new Array<any>();
            
            for(const arg of route.args)
            {
                args.push(
                    EntityFactory.instantiate(request, connection, arg.type, data[arg.name])
                );
            }

            result = instance[route.propertyKey](...args)
            await connection.close();
        }
        catch(err)
        {
            /**
             * @todo Custom HTTP debugger tool
             */
            result = new Response(200, err.message);
        }

        return result;
    }
}