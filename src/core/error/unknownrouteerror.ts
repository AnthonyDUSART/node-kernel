export default class UnknownRouteError extends Error
{
    private _pathname: string;

    constructor(pathname: string, message?: string)
    {
        super(message);
        this.pathname = pathname;
    }

    get pathname(): string
    {
        return this._pathname;
    }

    set pathname(pathname: string)
    {
        this._pathname = pathname;
    }
}