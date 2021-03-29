import Controller from "../core/controller";
import route from "../core/decorator/route";
import Request from "../core/http/request/request";
import Response from "../core/http/response/response";
import Test from "../entity/test";

@route({prefix: "/controller", name: "controller_"})
export default class TestController extends Controller
{
    @route({prefix: "/test", name: "test"})
    public test(request: Request, nombre: number): Response
    {

        console.log('Ceci est la requête !');
        console.log(request.pathname);
        console.log(nombre);

        return new Response('Bonjour', 204);
    }

    @route({prefix: "/hello", name: "hello"})
    public hello(oui: Test): Response
    {
        return new Response();
    }
}