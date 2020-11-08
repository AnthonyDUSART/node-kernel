import "reflect-metadata";
import Controller from "../controller";

interface RouteDefinition
{
    prefix: string,
    name: string
}

interface ControllerRouteDefinition extends RouteDefinition
{
    
}

interface MethodRouteDefintion extends RouteDefinition, MethodDefinition
{
    propertyKey: string,
}

interface MethodDefinition
{
    args: Array<ArgumentDefinition>
    returnType: Function
}

interface ArgumentDefinition
{
    name: string,
    type: Function
}

const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getParamNames(func: Function) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

export default function route(args: any): any
{
    return (target: any, propertyKey?: string, descriptor?: any): any =>
    {

        if(propertyKey == undefined)
        {
            /**
             * Controller decorator
             */
            if(!Reflect.hasMetadata("routes", target))
            {
                Reflect.defineMetadata("routes", new Array<ControllerRouteDefinition>(), target);
            }

            const route: ControllerRouteDefinition = {
                prefix: args.prefix,
                name: args.name
            }

            Reflect.defineMetadata(
                "controllerRoute",
                route,
                target
            );
        }
        else
        {
            /**
             * Method decorator
             */
            if(!Reflect.hasMetadata("routes", target.constructor))
            {
                Reflect.defineMetadata("routes", new Array<MethodRouteDefintion>(), target.constructor);
            }
    
            const methodArguments = new Array<ArgumentDefinition>();
            const params = Reflect.getMetadata('design:paramtypes', target, propertyKey);
            let paramsName = getParamNames(descriptor.value);
            const returnType = Reflect.getMetadata('design:returntype', target, propertyKey);
    
            paramsName.forEach((paramName, k) =>
            {
                const argument: ArgumentDefinition = {
                    name: paramName,
                    type: params[k]
                };
    
                methodArguments.push(argument);
            });
            
            const route: Array<MethodRouteDefintion> = [{
                prefix: args.prefix,
                name: args.name,
                propertyKey: propertyKey,
                args: methodArguments,
                returnType: returnType
            }];
    
            Reflect.defineMetadata(
                "routes",
                Reflect.getMetadata("routes", target.constructor).concat(route),
                target.constructor
            );
        }
        
    }
}