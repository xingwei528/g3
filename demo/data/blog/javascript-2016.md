---
title: JavaScript的景观州：一个新移民地图
author: 赖新星
postDate: 4/10/16
imageUrl: /uploads/blog/javascript-2016.jpg
---

# State of the JavaScript Landscape: A Map for Newcomers

If you have previous programming experience but are a newcomer to frontend JavaScript development, the array of jargon and tools can be confusing. Without getting bogged down in detailed discussion, let's take a general survey of the current "JavaScript landscape". This should orient you sufficiently to start your journey into frontend development.

Key terms are **bolded**. If you want to skip ahead to a repository with working boilerplate, I've put together a Github repository with my [recommendations][1].

## How does client-side JavaScript work, and why use it?

**_Key terms: DOM (Document Object Model), JavaScript, async, AJAX_**

To write effective frontend code, you need a basic understanding of how HTML, CSS, and JavaScript fit together to create web pages.

When the **client** (usually a **browser**) accesses an HTML page, it downloads it, parses it, and then uses it to construct the **DOM** (Document Object Model). JavaScript can interact with and modify the DOM, which is how you produce **interactive** websites.[ ][2][Here's a basic intro to the DOM.][2]

How is JavaScript included in your page? That's a separate can of worms, but it[ ][3][begins with script tags][3].

JavaScript execution [blocks][4] DOM construction. This means that spending lots of time executing JavaScript will make your page feel unresponsive. To avoid this, client-side JavaScript is often heavily **asynchronous**. (You may have heard of **AJAX**, which simply** **stands for **a**synchronous **J**avaScript **a**nd **X**ML.)

If you're building an interactive website, you'll need to use JavaScript, and you'll probably deal with asynchronicity in one form or another.

## What's a framework? Do I need to use trendy.js?

**_Key terms: React, Angular, Ember, Backbone, jQuery, Underscore, Lodash_**

"Framework" is a word with lots of meanings. The goal of a JavaScript framework is usually to reduce the amount of tedious work required to build an interactive webpage. Frameworks are basically scaffolding, designed to solve a particular kind of problem.

Many currently-popular frameworks are designed to address the problem of, "How do I create a single-page web application that supports complex user interactions, and manages all of my business logic on the frontend?" **Single-page applications,** or **SPAs**, are web applications that don't require a page refresh, where much of the product exists as a single "page" -- think about the Facebook homepage, or your Gmail inbox.

So which framework should you use? React? Angular? Ember? Do you even need a framework? Cue the choice paralysis!

All of these projects are trying to help you write better web applications. There is no correct answer to which framework, if any, you should use.

If you're just getting started with JavaScript it might be better to use **no framework at all**, and try building a site with jQuery and little else. That will quickly become tedious, but you can do it, and it will teach you important things about how JavaScript works. [You can still practice good software engineering principles with jQuery][5].

If you are working on a reasonably complex site, you'll probably find a framework helpful. Right now, [Angular][6], [React][7], and [Ember][8] are all popular and reasonable choices. [Backbone][9] is an older-style framework, and smaller in scope; it's also appropriate for many projects. The [starter kit][1] I've put together for this article uses React, but really, there's no wrong choice. To see for yourself how various frameworks compare, check out [TodoMVC][10], which implements the same checklist application using different frameworks.

JavaScript also lacks many standard library functions that other languages have built-in, like [padding strings][11] or [shuffling an array][12]. Because of this, libraries such as [jQuery][13], [Underscore][14], and [Lodash][15] are often used to fill in the gaps. These libraries are conventionally imported and referred to using $, _, and _ respectively, so if you see lots of dollar signs in a JavaScript file, that's almost certainly invoking jQuery.

If you're starting a new project, I recommend React or Angular, along with Lodash.

![][16]

## Should I be writing JavaScript, or something else? What kinds of JavaScript exist?

**_Key terms: ES5, ES6, ES2015, CoffeeScript, TypeScript, ClojureScript, Babel, transpiling, compiling, MDN reference_**

"JavaScript" is not really a single language. Each browser vendor implements their own JavaScript engine, and due to variations between browsers and versions, JavaScript suffers from some serious fragmentation. [CanIUse.com][17] documents some of these inconsistencies; you can also check the [Mozilla Developer Network documentation][18].

**ES6,** also known as **ES2015 / Harmony / ECMAScript 6 / ECMAScript 2015**, is the most-recent version of the JavaScript specification. It introduced new syntax and functionality. Fat arrows, ES6 classes, native modules, and template strings are all part of this version of JavaScript. [Treehouse has a good primer on ES6][19].

Despite the fragmented environment in which JavaScript runs, it's nice to be able to use new language features. Thus, tools such as **Babel** will transform your shiny, standardized JavaScript into a version that's compatible with older platforms. This process is called **transpiling**. It's not much different from **compiling**. By using a tool like Babel, you don't need to worry as much about the headaches of whether or not a given browser will support the JavaScript feature you're using.

Transpiler tools don't just convert ES6 JavaScript to ES5. There are also tools to do the same thing for JavaScript-variants, such as **ClojureScript, TypeScript, **and** CoffeeScript**. [ClojureScript][20] is a version of Clojure that compiles down to JavaScript. [TypeScript][21] is essentially JavaScript, but with a type system. [CoffeeScript][22] is very similar to JavaScript, but with shinier syntax; much of the syntactic sugar promoted by CoffeeScript has been adopted by ES6, rendering CoffeeScript significantly less useful. All of these compile down to regular JavaScript.

So what should you use? If you're new to frontend development, you should probably write ES6-style JavaScript. Most ES6 features have broad support across browser vendors. If you need to support older platforms, tools like Babel will compile your ES6 into ES5-compliant JavaScript for you. Stay away from shiny compile-to-JavaScript options such as ClojureScript for now, though once you have more frontend development experience, they're certainly worth exploring.

![][23]

## How do I use other people's code?

**_Key terms: AMD, commonJS modules, ES6 modules, npm, Github_**

The history of code sharing and modules in JavaScript is a bit complicated. I highly recommend reading Preethi Kasireddy's [JavaScript Modules: A Beginner's Guide][24] for more information.

For our purposes, the terms **module **and **library** are basically equivalent: they represent a chunk of self-contained code that we can use and re-use in our own projects. JavaScript modules are usually published via [npm][25], the node package manager. You can search for JavaScript modules on npm or on [Git][26][H][26][ub][26].

There are a few competing ways of defining a module (sometimes referred to as module syntax). The main ones are **CommonJS, AMD, **and **ES6 Native Modules**. CommonJS takes a synchronous, server-oriented approach. By contrast, AMD (Asynchronous Module Definition) allows you to define and load modules in an asynchronous, non-blocking manner. CommonJS and AMD were both created in a world where JavaScript didn't natively support any concept of modules or dependencies.

ES6 added support for native JavaScript modules, which support both the declarative syntax of CommonJS and the asynchronous loading of AMD, among other features. Finally, modules are part of the actual language.

You'll likely come across all three types of modules in your work. For new projects, you should use ES6 native modules. Build tools, such as webpack (see below), can be helpful for working with various types of modules in existing projects.

## Do I need Node.js?

**_Key terms: Node.js, npm, nvm_**

**Node.js** is a tool for writing server-side JavaScript. Wait, but weren't we only talking about frontend JavaScript?

Because JavaScript modules are usually packaged and shared via **npm**, the node package manager, you'll want to have Node.js installed even if you won't be using it for server-side development. The best way to do this on OS X or Linux-based systems is via **nvm**, the [Node Version Manager][27], which facilitates managing different version of Node.js. Windows users should look at [nvm-windows][28]**.**

## What are my build tools?

**_Key terms: grunt, gulp, bower, browserify, webpack, hot reloading, sourcemap_**

Requiring each JavaScript dependency as part of your page, script tag by script tag, is slow. Therefore, most sites use so-called JavaScript **bundles.** The bundling process takes all of your dependencies and "bundles" them together into a single file for inclusion on your page. Optionally, some developers also use a **minifying** step, where all unnecessary characters are stripped out of your JavaScript without changing its functionality. This reduces the amount of data that the client will have to download.

Some tools also support features such as **hot reloading**, which will live-update your project in your browser when you save a file; and **sourcemaps**, which make debugging easier by providing a mapping from your bundled JavaScript back to its original form.

What I've just described is, essentially, a build process. Whether or not most JavaScript developers describe it this way, you're compiling your code into a production-ready format. "Front-end devops," or the process of managing your build and deployment tools and dependencies, is an increasingly complex endeavor.

**Grunt, gulp, broccoli, brunch, browserify,** and **webpack** are all tools for JavaScript builds. Comparing them is difficult, because they each focus on solving different problems. Many of them use different abstractions to talk about the same problems, and we don't really have a shared base of jargon yet.

In my experience, the configurations for these tools are often poorly understood, and thus get copy-pasted around between projects. For reference, here's the webpack configuration I put together for the starter repo:

&nbsp;

    var webpack = require('webpack');
    module.exports = {
      entry: [
        "./app.js"
      ],
      output: {
        path: __dirname + '/static',
        filename: "bundle.js"
      },
      module: {
        loaders: [
          {
            test: /.js?$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            },
            exclude: /node_modules/
          }
        ]
      },
      plugins: [
      ]
    };

All told, this webpack configuration instructs webpack to:

* Start with app.js as the entry point
* Process all files ending in .js
* Use babel-loader to transform them, specifically handling ES6 transpilation (hence the es2015 query) and JSX (hence the react query)
* Bundle all the JavaScript into a file located in static/bundle.js

For new projects, I recommend **webpack. **It has strong adoption and handles large projects with complex dependency graphs well.

![][29]

## How do I test my code?

**_Key terms: Mocha, Jasmine, Chai, Tape, Karma, Selenium, phantomjs_**

Much as with any other kind of programming, your frontend JavaScript can [benefit][30] from testing. [Most][31] JavaScript developers say that they write at least some tests.

JavaScript lacks a built-in framework for running tests, so developers depend on external libraries. Much like JavaScript build systems, different testing tools focus on different aspects of the problem.

**Mocha** and **Jasmine** are two popular libraries, sometimes referred to as **testing frameworks**, that help you write tests. Their APIs are very similar; you describe how something ought to behave, then use assertions to test it.

&nbsp;

    describe('helloWorld()', function() {
      it('should greet me by name', function() {
        // assertions go here
      });
    });

Mocha doesn't actually come with a built-in assertion library, so most developers combine it with **Chai**. Their assertion syntax is similar:

    // Jasmine
    expect(helloWorld("Bonnie")).toEqual("Hello, Bonnie");

    // Chai
    expect(helloWorld("Bonnie")).to.equal("Hello, Bonnie");

For running your tests, Mocha provides a command-line utility, while Jasmine does not. Many developers use **Karma,** which is a** test runner** that can run both Jasmine and Mocha-style tests.

That's all well and good for unit tests; for JavaScript-based integration tests, we'll need more tools. In frontend terms, an integration test often involves using a browser to actually render and load the page, simulating user interactions, and checking the result.

**Selenium **is a web driver that is often used for these tests. You'll need to equip Selenium with a **browser driver**, so that it can launch the browser. **PhantomJS** is a so-called **headless browser** \-- it runs without a GUI -- that is often used in testing. Because they don't require a GUI, headless browsers are useful for automated tests. You may also find **Sinon** helpful; it provides a fake server, which can be useful for faking responses to AJAX requests.

You can also set up your JavaScript tests to run with your **continuous integration (CI)** system, such as **Jenkins** or **Travis**.

There are plenty of perfectly good choices for JavaScript testing tools. For new projects I typically choose Karma and Jasmine, with PhantomJS as my test browser, but Mocha + Chai is also a good choice.

![][32]

## So how do I get started?

I've pulled together a Github repo containing a basic frontend development setup here: <https: github.com="" bonniee="" react-starter="">

It uses:

* React
* Babel for transpilation
* Webpack for builds
* ES6 syntax (for React classes, and module exports)
* Karma + Jasmine + PhantomJS for tests

Let's break this down a bit more. React is the framework we're using, which makes it easier to build interactive websites. (You describe your UI, and React handles the rendering and DOM manipulation for you.) We'll write JavaScript in accordance with the ES6 specification. Webpack will use Babel to transpile our ES6 JavaScript code into ES5-compliant JavaScript; Webpack also manages our dependencies and module imports. Finally, we use Karma and PhantomJS to run our tests, and the Jasmine library to write them.

&nbsp;

![][33]

First, make sure you have a working version of [npm][34]. Then, to install your dependencies for this repository and get started:

`npm install`

`webpack`

Then, to develop with it, run:

`webpack --watch`

This will instruct webpack to watch your project and recompile it when your JavaScript files change. To view your application, you'll need to launch a local server. On OS X or Linux you can use Python to do this easily:

`python -m SimpleHTTPServer`

...and you're off to the races! Make edits to app.js or Hello.js to add more React components, and use npm test to run your tests.

Of course, having a working repository of starter code is just half the battle. The world of frontend JavaScript development can be complicated, and there's a proliferation of tools and terminology, as well as new concepts to learn and problems to solve. Any one of the topics above could easily fill an entire blog post. Hopefully this article has helped illuminate some of the JavaScript landscape, and will help guide you as you learn more about frontend development.

Welcome to the community!

[1]: https://github.com/bonniee/react-starter
[2]: https://css-tricks.com/dom/
[3]: http://www.sitepoint.com/a-detailed-breakdown-of-the-script-tag/
[4]: https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
[5]: https://www.youtube.com/watch?v=5Vpdyk9Hpng
[6]: https://angularjs.org/
[7]: https://facebook.github.io/react/
[8]: http://emberjs.com/
[9]: http://backbonejs.org/
[10]: http://todomvc.com/
[11]: https://lodash.com/docs#padStart
[12]: https://lodash.com/docs#shuffle
[13]: https://jquery.com/
[14]: http://underscorejs.org/
[15]: https://lodash.com/
[16]: http://cdn.infoq.com/statics_s1_20160414-0116/resource/articles/state-of-javascript-2016/en/resources/21.jpg
[17]: http://caniuse.com/#cats=JS%20API
[18]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
[19]: http://blog.teamtreehouse.com/get-started-ecmascript-6
[20]: http://www.lispcast.com/what-is-clojurescript
[21]: http://www.typescriptlang.org/
[22]: http://coffeescript.org/
[23]: http://cdn.infoq.com/statics_s1_20160414-0116/resource/articles/state-of-javascript-2016/en/resources/62.jpg
[24]: https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.nzvynjydf
[25]: https://www.npmjs.com/
[26]: https://github.com/search?o=desc&amp;q=language%3AJavaScript&amp;ref=searchresults&amp;s=stars&amp;type=Repositories&amp;utf8=%E2%9C%93
[27]: https://github.com/creationix/nvm
[28]: https://github.com/coreybutler/nvm-windows
[29]: http://cdn.infoq.com/statics_s1_20160414-0116/resource/articles/state-of-javascript-2016/en/resources/53.jpg
[30]: http://www.onjava.com/pub/a/onjava/2003/04/02/javaxpckbk.html
[31]: https://s3.amazonaws.com/dailyjs/files/2014-survey-summary.pdf
[32]: http://cdn.infoq.com/statics_s1_20160414-0116/resource/articles/state-of-javascript-2016/en/resources/14.jpg
[33]: http://cdn.infoq.com/statics_s1_20160414-0116/resource/articles/state-of-javascript-2016/en/resources/15.jpg
[34]: https://docs.npmjs.com/getting-started/installing-node
