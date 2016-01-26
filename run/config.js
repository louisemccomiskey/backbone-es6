'use strict';

// Loading dependencies.
var resolve = require('resolve'),
    path = require('path'),
    webpack = require('webpack');

module.exports = {

    /**
     * Locations of JavaScript source files. This array is used in
     * conjunction with linting and jscs tasks (keeping things DRY).
     * Paths should be relative to the top-level gulpfile.
     *
     * @type {Array}
     */
    scriptSourcePaths: ['./app/**/*.js'],

    /**
     * Settings for sourcemaps across JS and CSS bundles.
     *
     * @type {Object}
     */
    sourcemapOptions: {

        /**
         * Sourcemaps are built externally but there is two choices.
         * Source files can be embedded inside the map itself, or,
         * the source files can be referenced by the map and loaded
         * whenever you try to click line numbers in your dev tools.
         *
         * If your source files are not being served via a web server
         * then stick to using `External_EmbeddedFiles`.
         *
         * Potential Values:
         * 'External_EmbeddedFiles'
         * 'External_ReferencedFiles'
         *
         * @type {String}
         */
        type: 'External_EmbeddedFiles',

        /**
         * Sets the root path of where source files are hosted. This
         * path is relative to the source map. If you have sources in
         * different subpaths, an absolute path (from the domain root)
         * pointing to the source file root is recommended.
         *
         * NOTE: Only needs to be set for 'External_ReferencedFiles'.
         *
         * @type {String}
         */
        sourceRoot: '/'

    },

    /**
     * Where built output (CSS, JS, HTML, fonts, images) should be
     * stored on the filesystem. Can either be an absolute path or
     * relative path to the location of the gulpfile.
     *
     * @type {String}
     */
    destPath: './dist/',

    /**
     * Configuration settings for any task which needs them.
     * Keys should match the task name for consistency.
     *
     * @type {Object}
     */
    taskConfiguration: {
        build: {
            sourcePaths: ['./app/fonts/**/!(dir.txt)']
        },
        html: {
            sourcePaths: ['./app/html/**/*.html']
        },
        images: {
            sourcePaths: ['./app/img/**/!(dir.txt)'],
            imageminOptions: {
                svgoPlugins: [
                    { removeViewBox: false },
                    { removeUselessStrokeAndFill: false },
                    { convertPathData: { straightCurves: false } },
                    { cleanupIDs: false }
                ]
            }
        },
        server: {
            webserverSettings: {
                host: '0.0.0.0',
                port: process.env.PORT || 4321,
                https: false,
                open: true
            }
        },
        styles: {
            /**
             * A folder path that is prefixed with the global `destPath` to give a
             * standard destination for CSS bundles. This can be overridden per
             * bundle if for example some bundles need to go somewhere else.
             *
             * @type {String}
             */
            genericOutputFolder: './css/',

            /**
             * A manifest of CSS bundles needing to be created and output
             *
             * Bundle Object Keys:
             * `sourceFilePath` - The path to the SCSS entry file (relative to `gulpfile.js`).
             * `outputFileName` - The extensionless name of the output file.
             * `outputFolder` (Optional) - Overrides `genericOutputFolder`. Is relative to `gulpfile.js`.
             *
             * Example Bundles:
             * { sourceFilePath: './css/src/homepage.scss', outputFileName: 'homepage' },
             * { sourceFilePath: './css/src/about.scss', outputFileName: 'main', outputFolder: './modules/about-page/css/' }
             *
             * @type {Array}
             */
            bundles: [
                { sourceFilePath: './app/core/styles/index.scss', outputFileName: 'main' }
            ],

            /**
             * Settings to be passed through to `gulp-sass` and `node-sass`.
             * NOTE: `compact` used instead of `compressed` to due sourcemap bug.
             *
             * @type {Object}
             */
            sassSettings: {
                outputStyle: 'compact'
            },

            /**
             * Settings to be passed through to `gulp-autoprefixer`.
             *
             * @type {Object}
             */
            autoPrefixSettings: {
                browsers: ['last 2 versions', 'iOS >= 7.1', 'Android >= 4'],
                cascade: false
            }
        },
        scripts: {
            /**
             * A folder path that is prefixed with the global `destPath` to give a
             * standard destination for JS bundles.
             *
             * @type {String}
             */
            genericOutputFolder: './js/',

            /**
             * Settings for webpacks uglify plugin.
             *
             * @type {Object}
             */
            uglifySettings: {
                compress: {
                    drop_console: false,
                    drop_debugger: false,
                    warnings: false
                }
            },

            /**
             * Base settings for webpack.
             *
             * NOTE: For a full list of options, please visit:
             * https://webpack.github.io/docs/configuration.html
             *
             * @type {Object}
             */
            webpackSettings: {
                watch: false,
                entry: {
                    main: "./app/core/scripts/index.js"
                },
                output: {
                    filename: '[name].js'
                },
                module: {
                    loaders: [
                        // Loads HTML files as strings.
                        // {test: /\.html$/, loader: 'html'},
                        
                        // Loads Handlebars templates through the loader.
                        {
                            test: /\.hbs$/,
                            loader: 'handlebars-loader',
                            query: {
                                helperDirs: path.join(__dirname, './app/core/scripts/handlebarsFiles')
                            }
                        },
                        
                         // Loads Backbone without jQuery as a dependancy
                        {test: /backbone\.js$/, loader: 'imports?define=>false'},

                        // { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel?presets[]=es2015' }
                        { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel?plugins[]=transform-decorators-legacy,presets[]=es2015' }
             ]
                },
                plugins: [
                    new webpack.IgnorePlugin(/^jquery$/)
                ],

                //  Replace modules with other modules or paths (to point at our third_party vendors).
                //  NOTE: `browser` field of `package.json` worked but only for our app dependencies.
                //  Any third-party library that had requires didn't seem to read from `browser`.
                resolve: {
                    alias: {
                        'BackboneWrapper': resolve.sync('../app/core/scripts/backboneWrapper.js'),
                        'App': resolve.sync('../app/core/scripts/app.js'),
                        'baseView': resolve.sync('../app/core/scripts/BaseView.js'),
                        'config': resolve.sync('../app/core/scripts/config.js'),
                        'dataStore': resolve.sync('../app/core/scripts/dataStore.js'),
                        'decorators': resolve.sync('../app/core/scripts/decorators.js'),
                        'eventBus': resolve.sync('../app/core/scripts/eventBus.js'),
                        'router': resolve.sync('../app/core/scripts/router.js'),
                        'utils': resolve.sync('../app/core/scripts/utils.js'),
                        'imagePreloader': resolve.sync('../third_party/js/image-preloader.js')
                    }
                }
            }
        },
        test: {
            configPath: __dirname + '/../karma.conf.js'
        },
        watch: {
            sourcePaths: {
                html: ['./app/html/**/*.html'],
                styles: ['./third_party/css/**/*.scss', './app/**/*.scss'],
                scripts: ['./third_party/js/**/*.js', './app/**/*.js']
            }
        }
    }

};
