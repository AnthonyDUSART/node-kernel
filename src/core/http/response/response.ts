import StatusInterface from "../../interface/response/statusinterface";

export default class Response
{
    public _headers: {[key: string]: string};
    protected _content: Buffer;
    protected _version: string;
    protected _status: StatusInterface;
    protected _charset: string;

    /* Status codes translation table */
    public static statusInterfaces: Array<StatusInterface> = [
        {code: 100, text: 'Continue'},
        {code: 101, text: 'Switching Protocols'},
        {code: 102, text: 'Processing'},                          // RFC2518
        {code: 103, text: 'Early Hints'},
        {code: 200, text: 'OK'},
        {code: 201, text: 'Created'},
        {code: 202, text: 'Accepted'},
        {code: 203, text: 'Non-Authoritative Information'},
        {code: 204, text: 'No Content'},
        {code: 205, text: 'Reset Content'},
        {code: 206, text: 'Partial Content'},
        {code: 207, text: 'Multi-Status'},                        // RFC4918
        {code: 208, text: 'Already Reported'},                    // RFC5842
        {code: 226, text: 'IM Used'},                             // RFC3229
        {code: 300, text: 'Multiple Choices'},
        {code: 301, text: 'Moved Permanently'},
        {code: 302, text: 'Found'},
        {code: 303, text: 'See Other'},
        {code: 304, text: 'Not Modified'},
        {code: 305, text: 'Use Proxy'},
        {code: 307, text: 'Temporary Redirect'},
        {code: 308, text: 'Permanent Redirect'},                  // RFC7238
        {code: 400, text: 'Bad Request'},
        {code: 401, text: 'Unauthorized'},
        {code: 402, text: 'Payment Required'},
        {code: 403, text: 'Forbidden'},
        {code: 404, text: 'Not Found'},
        {code: 405, text: 'Method Not Allowed'},
        {code: 406, text: 'Not Acceptable'},
        {code: 407, text: 'Proxy Authentication Required'},
        {code: 408, text: 'Request Timeout'},
        {code: 409, text: 'Conflict'},
        {code: 410, text: 'Gone'},
        {code: 411, text: 'Length Required'},
        {code: 412, text: 'Precondition Failed'},
        {code: 413, text: 'Payload Too Large'},
        {code: 414, text: 'URI Too Long'},
        {code: 415, text: 'Unsupported Media Type'},
        {code: 416, text: 'Range Not Satisfiable'},
        {code: 417, text: 'Expectation Failed'},
        {code: 418, text: 'I\'m a teapot'},                       // RFC2324
        {code: 421, text: 'Misdirected Request'},                 // RFC7540
        {code: 422, text: 'Unprocessable Entity'},                // RFC4918
        {code: 423, text: 'Locked'},                              // RFC4918
        {code: 424, text: 'Failed Dependency'},                   // RFC4918
        {code: 425, text: 'Too Early'},                           // RFC-ietf-httpbis-replay-04
        {code: 426, text: 'Upgrade Required'},                    // RFC2817
        {code: 428, text: 'Precondition Required'},               // RFC6585
        {code: 429, text: 'Too Many Requests'},                   // RFC6585
        {code: 431, text: 'Request Header Fields Too Large'},     // RFC6585
        {code: 451, text: 'Unavailable For Legal Reasons'},       // RFC7725
        {code: 500, text: 'Internal Server Error'},
        {code: 501, text: 'Not Implemented'},
        {code: 502, text: 'Bad Gateway'},
        {code: 503, text: 'Service Unavailable'},
        {code: 504, text: 'Gateway Timeout'},
        {code: 505, text: 'HTTP Version Not Supported'},
        {code: 506, text: 'Variant Also Negotiates'},             // RFC2295
        {code: 507, text: 'Insufficient Storage'},                // RFC4918
        {code: 508, text: 'Loop Detected'},                       // RFC5842
        {code: 510, text: 'Not Extended'},                        // RFC2774
        {code: 511, text: 'Network Authentication Required'},     // RFC6585
    ];

    constructor(statusCode: number = 200, content: string | Buffer = '', headers: {[key: string]: string} = {})
    {
        this.headers = headers;
        this.content = Buffer.from(content);

        /* Protocole version */
        this.version = "1.0";

        this.setStatus(statusCode);
    }

    public isInvalid(statusCode: number): boolean
    {
        return statusCode < 100 || statusCode >= 600;
    }

    public setStatus(statusCode: number, text?: string)
    {
        if(this.isInvalid(statusCode))
        {
            throw new Error(`The HTTP status code "${statusCode}" is not valid.`);
        }

        if(text !== undefined)
        {
            this._status = {code: statusCode, text: text};
        }
        else
        {
            for(let i = 0; i < Response.statusInterfaces.length; i++)
            {
                const statusInterface = Response.statusInterfaces[i];
    
                if(statusCode == statusInterface.code)
                {
                    this._status = statusInterface;
                    break;
                }
            }
        }
    }

    public setHeader(key: string, value: string)
    {
        this._headers[key] = value;
    }

    set headers(headers: {[key: string]: string})
    {
        this._headers = headers;
    }

    get headers(): {[key: string]: string}
    {
        return this._headers;
    }

    set content(content: Buffer)
    {
        this._content = content ?? '';
    }

    get content(): Buffer
    {
        return this._content;
    }

    set version(version: string)
    {
        this._version = version;
    }

    get version(): string
    {
        return this._version;
    }

    set status(status: StatusInterface)
    {
        this._status = status;
    }

    get status(): StatusInterface
    {
        return this._status
    }

    set charset(charset: string)
    {
        this._charset = charset;
    }

    get charset(): string
    {
        return this._charset;
    }
}