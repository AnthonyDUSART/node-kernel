import Controller from "../core/controller";
import route from "../core/decorator/route";
import Request from "../core/http/request/request";
import JsonResponse from "../core/http/response/jsonresponse";
import Response from "../core/http/response/response";
import Test from "../entity/test";

@route({prefix: "/controller", name: "controller_"})
export default class TestController extends Controller
{
    @route({prefix: "/test/{nombre}/{caca}", name: "test"})
    public test(request: Request, nombre: number, caca: string): Response
    {
        return this.render('base.html.twig', {
            nombre: nombre,
            caca: caca
        });
    }

    @route({prefix: "/hello", name: "hello"})
    public hello()
    {
        return new Response(200, 'its ok');
    }
}