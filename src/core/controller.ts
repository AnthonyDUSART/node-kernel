import Twig from 'twig';
import Response from './http/response/response';
import * as twig_config from '../config/twig.json';

export default abstract class Controller
{
    public renderFile(path: string, parameters: Object = new Object()): string
    {
        var template = Twig.twig({
            path: twig_config.templatesPath + path,
            async: false
        });
        return template.render(parameters);
    }

    public render(path: string, parameters: Object = new Object()): Response
    {
        return new Response(200, this.renderFile(path, parameters));
    }
}