export default class KernelError extends Error
{
    public constructor(message?: string)
    {
        super(message);
    }
}