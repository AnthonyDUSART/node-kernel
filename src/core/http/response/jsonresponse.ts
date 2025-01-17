import Response from "./response";

export default class JsonResponse extends Response
{
    constructor(statusCode: number = 200, content: string = '',  headers: Array<any> = new Array())
    {
        super(statusCode, JSON.stringify(content), headers);
    }
}