# Frog Rain

Frog Rain is an opinionated starter kit for Magnolia CMS frontend development. It contains everything necessary to kickstart a Magnolia site project with no Java coding required.

Frog Rain was inspired by Topher Zimmermann's [magnolia-lighter](https://github.com/topherzee/magnolia-lighter) and [that scene from Magnolia the movie](https://www.youtube.com/watch?v=Oo6tyeQJDLQ).

## Why would I want to use it?

Building a Magnolia build environment for light module development is no rocket science, but since there are not many opinionated boilerplate projects available for it there's a lot of decisions for you to make. This project encapsulates some of the best practices we at [Houston Inc](http://www.houston-inc.com/en/) have ended up with, while still allowing you to use the frontend technologies you know and love.

Frog Rain is built on the principle that all components and pages have their own isolated styles and JavaScript functionality. Any component JavaScript or its dependencies will not be loaded unless they are actually used on the page. This helps keep the project tidy and minimize unnecessary JS downloading and execution.

## How do I use it?

Clone the repository and modify it to your needs. To see how it works, install the dependencies and either add the resulting light module from `magnolia-modules` to your Magnolia module directory or fire up the included Vagrant box and access <http://localhost:8888>.

Install dependencies:

```
npm install
```

Start local Magnolia virtual server:

```
vagrant up
vagrant rsync-auto
```

Build the project:

```
gulp
```

## What is included
* [Gulp](http://gulpjs.com/) for building the project
* [Babel](https://babeljs.io/) for transpiling the modern ES2015 language to ES5 compatible JavaScript
* [SASS](http://sass-lang.com/), the excellent CSS preprocessor
* [PostCSS](http://postcss.org/) for [autoprefixing](https://github.com/postcss/autoprefixer) properties (no need to worry about -o, -webkit, -moz, etc)
* [Vagrant](https://www.vagrantup.com/) for quickly creating a local Magnolia development server
* [Magnolia 5.5 Community Edition](https://www.magnolia-cms.com/)
* [ESLint](http://eslint.org/) for enforcing code style conventions
* [PPR.js](https://www.npmjs.com/package/ppr-js) for writing component specific JavaScript
* [RequireJS](http://requirejs.org/) for dynamically loading JS dependencies
* [Karma](https://karma-runner.github.io/1.0/index.html), [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) for tests (WIP)

## What is not included / out of scope
* Any fancy UI or styles
* Grid library (we recommend [Reflex](http://leejordan.github.io/reflex/docs/))
* CSS naming conventions (we recommend [BEM](http://getbem.com/))
* UI toolkit such as Bootstrap or Foundation
* Any external fonts or icon kits
* MTE (Magnolia Templating Essentials)
* YAML extends (will be natively supported in a near future release of Magnolia)
