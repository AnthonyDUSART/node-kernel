import MethodDefinition from "./methoddefinition";
import RouteDefinition from "./routedefinition";

export default interface MethodRouteDefintion extends RouteDefinition, MethodDefinition
{
    propertyKey: string
}