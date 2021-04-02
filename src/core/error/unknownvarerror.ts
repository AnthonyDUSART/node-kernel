export default class UnknownVarError extends Error
{
    private _variable: any;

    constructor(variable: any, message?: string)
    {
        super(message);
        this._variable = variable;
    }

    get variable(): any
    {
        return this._variable;
    }

    set variable(variable: any)
    {
        this._variable = variable;
    }
} 