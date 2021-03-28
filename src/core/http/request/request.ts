import { URLSearchParams } from 'url';

export default class Request
{
    private _method?: string;
    private _query: URLSearchParams;            /* GET */
    private _request: any;          /* POST */
    private _attributes: Array<any>;
    private _server: any;           /* SERVER */
    private _files: any;            /* FILES */
    private _cookies: any;          /* COOKIES */

    private _content?: string;
    private _headers: Array<any>;

    constructor(query: URLSearchParams = new URLSearchParams(), request: Array<any> = new Array<any>(), attributes: Array<any> = new Array<any>(), cookies: Array<any> = new Array<any>(), files: Array<any> = new Array<any>(), server: Array<any> = new Array<any>(), content?: string)
    {
        this.query = query;
        this.request = request;
        this.attributes = attributes;
        this.server = server;
        this.files = files;
        this.cookies = cookies;
        this.content = content;

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
    
    get request(): any
    {
        return this._request;
    }
    
    set request(request: any)
    {
        this._request = request;
    }
    
    get attributes(): Array<any>
    {
        return this._attributes;
    }

    set attributes(attributes: Array<any>)
    {
        this._attributes = attributes;
    }

    get server(): any
    {
        return this._server;
    }

    set server(server: any)
    {
        this._server = server;
    }

    get files(): any
    {
        return this._files;
    }

    set files(files: any)
    {
        this._files = files;
    }

    get cookies(): any
    {
        return this._cookies;
    }

    set cookies(cookies: any)
    {
        this._cookies = cookies;
    }

    get content(): string | undefined
    {
        return this._content;
    }

    set content(content: string | undefined)
    {
        this._content = content;
    }

    get headers(): Array<any>
    {
        return this._headers;
    }

    set headers(headers: Array<any>)
    {
        this._headers = headers;
    }
}