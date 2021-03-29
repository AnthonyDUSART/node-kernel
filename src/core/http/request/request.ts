import { IncomingHttpHeaders } from 'node:http';
import { URLSearchParams } from 'url';
import CookiesInterface from '../../../interface/cookiesinterface';

export default class Request
{
    private _method?: string;                   /* METHOD */
    private _query: URLSearchParams;            /* GET */
    private _request: Object;                   /* POST */
    private _files: Object;                     /* FILES */
    private _cookies: CookiesInterface;         /* COOKIES */
    private _headers: IncomingHttpHeaders;      /* HEADERS */

    constructor(query: URLSearchParams = new URLSearchParams(), request: Object = new Object(), cookies: CookiesInterface = {}, files: Object = new Object())
    {
        this.query = query;
        this.request = request;
        this.files = files;
        this.cookies = cookies;
    }

    get method(): string | undefined
    {
        return this._method;
    }

    set method(method: string | undefined)
    {
        this._method = method;
    }

    
    get query(): URLSearchParams
    {
        return this._query;
    }
    
    set query(query: URLSearchParams)
    {
        this._query = query;
    }
    
    get request(): Object
    {
        return this._request;
    }
    
    set request(request: Object)
    {
        this._request = request;
    }

    get files(): Object
    {
        return this._files;
    }

    set files(files: Object)
    {
        this._files = files;
    }

    get cookies(): CookiesInterface
    {
        return this._cookies;
    }

    set cookies(cookies: CookiesInterface)
    {
        this._cookies = cookies;
    }

    get headers(): IncomingHttpHeaders
    {
        return this._headers;
    }

    set headers(headers: IncomingHttpHeaders)
    {
        this._headers = headers;
    }
}