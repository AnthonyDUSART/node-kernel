import Controller from "../core/controller";
import route from "../core/decorator/route";
import Request from "../core/http/request/request";
import JsonResponse from "../core/http/response/jsonresponse";
import Response from "../core/http/response/response";
import Test from "../entity/test";

@route({prefix: "/controller", name: "controller_"})
export default class TestController extends Controller
{
    @route({prefix: "/test", name: "test"})
    public test(request: Request, nombre: number): Response
    {        
        return new Response(200, this.renderFile('./src/templates/base.html.twig', {
            nombre: nombre
        }));
    }

    @route({prefix: "/hello", name: "hello"})
    public hello()
    {
        console.log(this);
    }
}