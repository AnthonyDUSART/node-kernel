import ArgumentDefinition from "./argumentdefinition";

export default interface MethodDefinition
{
    args: Array<ArgumentDefinition>
    returnType: Function
}