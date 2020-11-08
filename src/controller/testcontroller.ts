import Controller from "../core/controller";
import route from "../core/decorator/route";
import Response from "../core/response";
import Test from "../entity/test";

@route({prefix: "/controller", name: "controller_"})
export default class TestController extends Controller
{
    @route({prefix: "/test", name: "test"})
    public test(arg1: string, test: Test): Response
    {

        return new Response();
    }

    @route({prefix: "/hello", name: "hello"})
    public hello(oui: Test): Response
    {
        return new Response();
    }
}