import * as utils from "@node-kernel/core/src/utils/file";

export default class Autoloader
{
    public static async fromDirectories(...directories: string[]): Promise<any>
    {
        const exports = new Array<Object>();
        const paths = await utils.getFilePathOfDirectories(directories);
        console.log(paths);
        for(const path of paths)
        {
            exports.push(await import(path));
        }

        return exports;
    }
}