import field from "../core/decorator/field";
import Entity from "../core/entity";

export default class Test extends Entity
{
    @field({name: "id", type: "integer"})
    private _id: number;

    @field({name: "message", type: "string"})
    private _message: string;

    @field({name: "test", type: "OneToMany"})
    private _test: Test;

    get id(): number
    {
        return this._id;
    }

    set id(id: number)
    {
        this._id = id;
    }

    get message(): string
    {
        return this._message;
    }

    set message(message: string)
    {
        this._message = message;
    }
}