import http from 'http';
import path from 'path';
import mime from "mime-types";
import qs from 'querystring';
import fs from 'fs';
import {URL} from 'url';
import Request from './request/request';
import Cookie from './cookie';
import UnknownRouteError from '../error/unknownrouteerror';
import Kernel from '../kernel';
import ContainerManager from '../container/containermanager';
import Response from './response/response';
import { isEmpty } from 'lodash';
const formidable = require('formidable');

export default class HTTPServer {

    private _port: number;
    private _context: http.Server;

    constructor(port: number = 80)
    {
        this._port = port;
        this.context = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) =>
        {
            this.handleRequest(request, response);
        });
    }

    private handleRequest(incomingMessage: http.IncomingMessage, serverResponse: http.ServerResponse)
    {
        if(incomingMessage.url === undefined)
        {
            throw new Error('Impossible to parse URL.');
        }

        const request = new Request();
        const form = formidable();
        const url = new URL(incomingMessage.headers.protocol + '://' + incomingMessage.headers.host + incomingMessage.url);
        
        request.pathname = url.pathname;
        
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
        });
        
        form.on('end', async () =>
        {
            request.query = url.searchParams;
            request.cookies = Cookie.parseCookies(incomingMessage.headers.cookie);
            request.headers = incomingMessage.headers;
            request.method = incomingMessage.method;
            let response = await this.handleStatic(request) ?? await this.handleRoute(request);

            if(!response)
            {
                response = new Response(404);
            }
            serverResponse.writeHead(response.status.code, response.status.text, response.headers);
            serverResponse.end(response.content);
        });
    }

    public async handleStatic(request: Request): Promise<Response | void>
    {
        let response: Response | void;
        const pathname = request.pathname;
        const ext = path.extname(pathname);
        if(!isEmpty(ext))
        {
            try
            {
                response = await new Promise((resolve, reject) =>
                {
                    fs.access(`${process.cwd()}/public/build${pathname}`, exists =>
                    {
                        fs.readFile(`${process.cwd()}/public/build${pathname}`, (err, data) =>
                        {
                            if(err)
                            {
                                reject(
                                    new Response(500, `Error getting the file: ${err}.`)
                                );
                            }
                            else {
                                resolve(
                                    new Response(200, data, {
                                        'Content-type': mime.contentType(ext) || 'text/plain'
                                    })
                                );
                            }
                        });
                    });
                });
            }
            catch(err)
            {
                console.error(err);
            }
        }

        return response;
    }

    public async handleRoute(request: Request): Promise<Response | void>
    {
        let response: Response | void;
        let finded: boolean = false;
        const pathname = request.pathname;

        try
        {
            /* Route finder */
            for(const controller of Kernel.registry.controllers)
            {
                const controllerRoute = Reflect.getMetadata("controllerRoute", controller);

                for(const route of Reflect.getMetadata("routes", controller))
                {
                    /* Matching route test */
                    const finalRoute = (controllerRoute.prefix + route.prefix);
                    const matches = finalRoute.matchAll(/\{(.*?)\}/g);
                    let finalReg: String = '^' + finalRoute.split('/').join('\\/');
                    for(const match of matches)
                    {
                        finalReg = finalReg.replace(match[0], '(?<' + match[1] + '>[^\/]+)');
                    }
                    finalReg += '$';

                    if(new RegExp(finalReg.toString()).test(pathname))
                    {
                        let data: {[key: string]: any} = pathname.match(finalReg.toString())?.groups ?? {};
                        //data['request'] = request;
                        response = await ContainerManager.invoke(request, controller, route, data);
                        finded = true;
                        break;
                    }
                }

                if(finded)
                {
                    break;
                }
            }
            
            if(!response)
            {
                throw new UnknownRouteError(pathname);
            }
        }
        catch(err)
        {
            /** 
             * @TODO : LOGGER 
             */
            //console.log(err);
        }

        return response;
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