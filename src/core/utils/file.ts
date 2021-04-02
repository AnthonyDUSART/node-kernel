import path from "path";
import fs from "fs";
import yaml from 'js-yaml';
import dotenv from "dotenv";
import UnknownVarError from "../error/unknownvarerror";

dotenv.config();
const envReg = /\$\{(.*?)\}/;       // ENV VAR REGEX EXPRESSION

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

export function parseConfigFile(file: string): object
{
    const lines = <object>yaml.load(fs.readFileSync(`${process.cwd()}/config/${file}`, 'utf8'))

    return parse(lines);
    
}

function parse(obj: object)
{
    
    let result: {[key: string]: any} = {};
    for(const subObj of Object.entries(obj))
    {
        let key = subObj[0];
        let value = subObj[1];

        if(typeof value === "object")
        {
            result[key] = parse(value);
        }
        else
        {
            if(typeof value === "string")
            {
                const matches = value.matchAll(new RegExp(envReg, "g"));
                for(const match of matches)
                {
                    const env = process.env[match[1]];
                    if(env === undefined)
                    {
                        throw new UnknownVarError(match[1], "Unknown variable in environment setting.");
                    }

                    value = value.replace(new RegExp(envReg), env);
                }
            }
            result[key] = value;
        }
    }

    return result;
}

export function formatPath(directory: string, file: string) {
    return path.resolve(directory, file);
}
