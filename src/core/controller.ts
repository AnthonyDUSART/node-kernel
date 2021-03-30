import Twig from 'twig';
import Response from './http/response/response';

export default abstract class Controller
{
    public renderFile(path: string, parameters: Object = new Object()): string
    {
        var template = Twig.twig({
            path: './src/templates/base.html.twig'
        });

        return template.render(parameters)
    }

    public render(path: string, parameters: Object = new Object()): Response
    {
        return new Response(200, this.renderFile(path, parameters));
    }
}