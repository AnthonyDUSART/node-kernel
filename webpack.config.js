const Voodoo = require('./build/core/voodoo/voodoo').default;

Voodoo
    .setOutputDir('public/build')
    .setPublicPath('/build')
    .setScriptFilename('js/[name].[hash:8].js')
    .setStyleFilename('css/[name].[hash:8].css')
    .copyFiles('images', 'images/[path][name].[hash:8][ext]')
    .copyFiles('favicon.ico', '[name][ext]')
    .addEntry('app', './assets/app.ts')
    .addEntry("caca", './assets/caca.ts');

module.exports = [Voodoo.getWebpackConfig()];