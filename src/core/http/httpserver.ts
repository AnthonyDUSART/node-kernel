import * as http from 'http';
import {URL} from 'url';
import * as qs from 'querystring';
import Request from './request/request';
import Cookie from './cookie';
import * as fs from 'fs';
const formidable = require('formidable');

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

        const request = new Request();
        const form = formidable();
        const url = new URL(incomingMessage.headers.protocol + '://' + incomingMessage.headers.host + incomingMessage.url);
        
        let buffer = new Array<Uint8Array>();

        form.parse(incomingMessage, (err: any, fields: any, files: any) =>
        {
            request.request = fields;
            request.files = files;
        });

        incomingMessage.on('data', (chunk: Uint8Array) =>
        {
            buffer.push(chunk);

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (buffer.length > 1e6)
                incomingMessage.socket.destroy();
        });

        incomingMessage.on('error', err =>
        {
            console.error(err);
        });

        incomingMessage.on('end', () =>
        {
            const body = Buffer.concat(buffer).toString();
            //const post = qs.parse(body.toString());
            const cookies = Cookie.parseCookies(incomingMessage.headers.cookie)

            serverResponse.writeHead(200, 'OK', {
                'Set-Cookie': 'mycookie=test'
            });
            serverResponse.end(`
            <body>
                <form method="POST" enctype="multipart/form-data">
                    <input type="text" name="core" value="test">
                    <input type="text" name="core2" value="test2">
                    <input type="file" name="core3">
                    <input type="submit">
                </form>
            </body>
            
            `);

            request.query = url.searchParams;
            request.cookies = cookies;
            request.headers = incomingMessage.headers;
            request.method = incomingMessage.method;
            
        });
        
        form.on('end', () =>
        {
            console.log(request);
        });
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