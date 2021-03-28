export default class UnknownObjectError extends Error
{
    private _object: Object;
    public constructor(object: Object, message?: string)
    {
        super(message);

        this._object = object;
    }

    get object()
    {
        return this._object;
    }

    set object(object: Object)
    {
        this._object = object;
    }
}