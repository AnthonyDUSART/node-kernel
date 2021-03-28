import * as http from 'http';
import {URL} from 'url';
import * as qs from 'querystring';
import Request from './request/request';

export default class HTTPServer {

    private _port: number;
    private _context: http.Server;

    constructor(port: number = 80)
    {
        this._port = port;
        this.context = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) =>
        {
            this.handler(request, response);
        });
    }

    private handler(incomingMessage: http.IncomingMessage, serverResponse: http.ServerResponse)
    {
        if(incomingMessage.url === undefined)
        {
            throw new Error('Impossible to parse URL.');
        }

        const url = new URL(incomingMessage.headers.protocol + '://' + incomingMessage.headers.host + incomingMessage.url);
        
        let body = '';
        let post;

        incomingMessage.on('data', chunk =>
        {
            body += chunk;
        });

        incomingMessage.on('end', () =>
        {
            let post = qs.parse(body);
            console.log(post);
        });
        
        serverResponse.writeHead(200, 'OK', []);
        serverResponse.end(`
        <body>
            <form method="POST">
                <input type="text" name="core" value="test">
                <input type="submit">
            </form>
        </body>
        
        `);
        console.log('\x1b[33m%s\x1b[0m', `${incomingMessage.method} => ${url.pathname} ... ${serverResponse.statusCode}`);
        console.log(url.searchParams.entries());
        console.log(body);

        const request = new Request(url.searchParams, post);
    }

    public listen()
    {
        this.context.listen(this.port);
    }

    set port(port: number)
    {
        this._port = port;
    }

    get port(): number
    {
        return this._port;
    }

    set context(context: http.Server)
    {
        this._context = context;
    }

    get context(): http.Server
    {
        return this._context;
    }

}