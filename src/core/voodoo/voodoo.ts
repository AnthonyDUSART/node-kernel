import EntriesInterface from "./entriesinterface";
import path from "path";
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { WebpackPluginInstance } from "webpack";

export default class Voodoo
{
    private static _entries: EntriesInterface;
    private static _outputDir: string;
    private static _files: Array<any>;
    private static _publicPath: string = './';
    private static _cleanupOutput: boolean = true;
    private static _scriptFilename: string = '[name].js';
    private static _styleFilename: string = '[name].css';
    private static _plugins: Array<WebpackPluginInstance> = new Array();
    private static _moduleRules: Array<Object>;

    static get entries(): EntriesInterface
    {
        return this._entries;
    }

    static set entries(entries: EntriesInterface)
    {
        this._entries = entries;
    }

    public static addEntry(name: string, path: string): Voodoo
    {
        if(!Voodoo.entries)
        {
            Voodoo.entries = {};
        }

        Voodoo._entries[name] = path;

        return this;
    }

    public static setOutputDir(outputDir: string): Voodoo
    {
        Voodoo._outputDir = outputDir;

        return this;
    }

    public static copyFiles(from: string, to: string): Voodoo
    {
        if(!Voodoo._files)
        {
            Voodoo._files = new Array<any>();
        }
        
        this._files.push({from: `${process.cwd()}/assets/${from}`, to: `${process.cwd()}/${this._outputDir}/${to}`});

        return this;
    }

    public static setPublicPath(path: string): Voodoo
    {
        Voodoo._publicPath = path;

        return this;
    }

    public static setCleanupOutput(cleanupOutput: boolean): Voodoo
    {
        Voodoo._cleanupOutput = cleanupOutput;

        return this;
    }

    public static setScriptFilename(filename: string): Voodoo
    {
        Voodoo._scriptFilename = filename;
        
        return this;
    }

    public static setStyleFilename(filename: string): Voodoo
    {
        Voodoo._styleFilename = filename;

        return this;
    }

    public static getPlugins()
    {
        const plugins = new Array<any>(
            new MiniCssExtractPlugin({
                filename: this._styleFilename
            })
        );

        if(this._files)
        {
            plugins.push(
                new CopyPlugin({
                    patterns: this._files
                })
            )
        }
        
        return plugins;
    }

    public static addPlugin(plugin: any, rule: Object): Voodoo
    {
        Voodoo._plugins
        return this;
    }

    public static getWebpackConfig()
    {
        return {
            entry: this.entries,
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.(sa|sc|c)ss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'postcss-loader',
                            'sass-loader',
                        ],
                    },
                ],
            },
            resolve: {
                extensions: [ '.tsx', '.ts', '.js' ],
            },
            output: {
              filename: this._scriptFilename,
              path: path.resolve(process.cwd(), this._outputDir),
              publicPath: this._publicPath,
              clean: this._cleanupOutput,
            },
            plugins: this.getPlugins()
        }
    }
}