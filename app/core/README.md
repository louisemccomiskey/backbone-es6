# Core Files

## What does it do?

The `core` folder holds all the global stylesheets and script files that the rest of the app can use. All source files are placed within `src` and are split into modular files to aid in decoupling and organisation.

The `views` folder holds folders for each of the different pages within the app. Each page has it's own specific scripts, stylesheets, templates and test files all saved separately.

The `components` folder is similiar to the `screen` folder structure, it is for smaller features that are used throughout the app for e.g the ui-animations manager & the header view.

Build files that are the end result of compilation are placed wherever the `destPath` of global settings points to, then nested inside `css` or `js` folders respectively.


## Script Files:

The `app/core/scripts/handlebarsfiles` can contain both handlebars helpers and partial. All helpers and partials must be added into this folder so they can be picked up by Webpack.
All ht .hbs files are Partials  All the helper.js files are helpers.

## Stylesheet Files:



## Documentation

TODO:

Pipe picturefill through from third party library and then load as a separate bundle.
Add the ./app as a global variable and add to the config settings
Add a js vendor only bundle.
Do we need html-loader?



 



