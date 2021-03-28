import * as path from "path";
import * as fs from "fs";

export async function getFilePathOfDirectories(directories: Array<string>): Promise<Array<string>>
{
    const files = new Array<string>();

    for(const directory of directories)
    {
        const directoryFiles = await fs.promises.readdir(directory);

        for(const file of directoryFiles)
        {
            files.push(formatPath(directory, file));
        }
    }

    return files;
}

export function formatPath(directory: string, file: string) {
    return path.resolve(directory, file);
}
