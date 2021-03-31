import Constructable from "../interface/constructableinterface";
import MethodRouteDefintion from "../interface/methodroutedefinition";
import Controller from "../controller";
import Request from "../http/request/request";
import Response from "../http/response/response";
import { getParamNames } from "../utils/method";
import EntityFactory from "./entityfactory";

export default abstract class ContainerManager
{

    public static invoke(request: Request, controller: any, route: any, data: any): Response
    {
        const instance = new controller();
        const args = new Array<any>();
        for(const arg of route.args)
        {
            args.push(
                EntityFactory.instantiate(arg.type, data[arg.name])
            );
        }

        return instance[route.propertyKey](...args);
    }
}