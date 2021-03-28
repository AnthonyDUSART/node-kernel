import field from "../core/decorator/field";
import Entity from "../core/entity";
import Test from "./test";

export default class Message extends Entity
{
    @field({name: "test", type: "OnetoMany"})
    private _test: Test;
}