#ODIN Admin

## Requirements

- Npm 3.10.x
- Bower
- Nodejs

## How to install

- Install all npm dependencies: `npm install`
- Install bower globaly: `npm install -g bower` or `node_modules/bower/bin/bower install`
- Install all bower dependencies: `bower install`
- Edit the configuration file `config.json` or create and edit file `config.local.json`

## Build and Serve for Development

The default gulp task will generate the config module for Angular according to the environment, it will serve and watch the files.

- `npm run gulp:dev`

## Build for Deploy

To build the app for the different environments:

- `npm run gulp:prod`

> This task will generate and copy all necessary files to run the application under the `/dist` directory. This directory is ignored by git on purpose, since all it's files are regenerated on each build.

## Deploy

After build, serving the `/dist` directory is enough for deployment.

If you want to try on your local environment, execute a [Python SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html) on `/dist`.

> Have in mind that a new generated `index.html` is placed under `/dist` with the paths to the concatenated and minified files.
