import Constructable from "../../interface/constructableinterface";
import MethodRouteDefintion from "../../interface/methodroutedefinition";
import Controller from "../controller";
import Request from "../http/request/request";
import { getParamNames } from "../utils/method";
import EntityFactory from "./entityfactory";

export default abstract class ContainerManager
{

    public static invoke(request: Request, controller: any, route: any)
    {
        const instance = new controller();
        const method = instance[route.propertyKey];
        const args = new Array<any>();
        const data: {[key: string]: any} = {};
        data['request'] = request;
        data['nombre'] = '523';

        for(const arg of route.args)
        {
            args.push(
                EntityFactory.instantiate(arg.type, data[arg.name])
            );
        }

        method(...args);
    }
}