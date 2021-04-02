import { EntityManager } from "typeorm";
import Controller from "../core/controller";
import route from "../core/decorator/route";
import Request from "../core/http/request/request";
import JsonResponse from "../core/http/response/jsonresponse";
import Response from "../core/http/response/response";
import User from "../entity/user";

@route({prefix: "/controller", name: "controller_"})
export default class TestController extends Controller
{
    @route({prefix: "/test/{nombre}/{caca}", name: "test"})
    public test(req: Request, em: EntityManager, nombre: number, caca: string): Response
    {
        console.log(req);
        return this.render('index.html.twig', {
            nombre: nombre,
            caca: caca,
            request: req
        });
    }

    @route({prefix: "/hello", name: "hello"})
    public hello()
    {
        return new Response(200, 'its ok');
    }
}