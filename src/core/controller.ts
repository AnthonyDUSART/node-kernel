import Twig from 'twig';

export default abstract class Controller
{
    constructor()
    {

    }

    public renderFile(path: string, parameters: Object = new Object()): string
    {
        var template = Twig.twig({
            path: './src/templates/base.html.twig'
        });

        return template.render(parameters)
    }
}