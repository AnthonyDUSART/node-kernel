import Response from "./response";

export default class JsonResponse extends Response
{
    constructor(statusCode: number = 200, content: string = '',  headers: {[key: string]: string} = {})
    {
        super(statusCode, JSON.stringify(content), headers);
    }
}