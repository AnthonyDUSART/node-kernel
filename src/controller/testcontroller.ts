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
    public test(request: Request, nombre: number): JsonResponse
    {

        console.log('Ceci est la requête !');
        console.log(request.get('bonsoir'));
        console.log(nombre);

        return new JsonResponse(200);
    }

    @route({prefix: "/hello", name: "hello"})
    public hello(oui: Test): Response
    {
        return new Response();
    }
}