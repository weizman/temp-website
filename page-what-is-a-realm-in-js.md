---
layout: page
title: What is a realm in JavaScript?
url: https://weizman.github.io/
date: 28/10/2022
description: An easy to understand explanation of what realms are in JavaScript
keywords: research, realms, security, iframe, window, JavaScript
image: /content/img/what-is-a-realm-in-js.png

---

As part of my long term research around browser JavaScript security, in the past year I have been focusing specifically on [security for realms ⭐️](https://github.com/weizman/awesome-JavaScript-realms-security).

Due to the rise of dependencies-based development, the JavaScript ecosystem (and the browser JavaScript ecosystem in particular) is far more vulnerable to what we know as ["supply chain attacks"](https://en.wikipedia.org/wiki/Supply_chain_attack) - and the ability to create new realms in JavaScript is being leveraged to successfully carry out such attacks against web apps (if you want to understand why that is I recommend reading [my previous post](https://twitter.com/WeizmanGal/status/1576942106156810240) on this).

The realms security field is far from being properly addressed, and I hope to gradually fix that starting by introducing the first open source realms security tool - [Snow-JS ❄️](https://github.com/lavamoat/snow) by [LavaMoat 🌋](https://github.com/lavamoat) (stay tuned).

But in order for any of this to make sense, we must first understand **what realms are** - and apparently that's not an easy question to answer in a correct, yet **informal** and educational way.

> *The context of this post is focused around browser JavaScript, therefore it may apply to JavaScript in general, but that is not guaranteed.*

## A [realm](https://tc39.es/ecma262/#sec-code-realms) - the world where JavaScript lives 

You can informally think of a realm as basically an ecosystem in which a JavaScript program lives. And just like any other ecosystem, it includes different elements that JavaScript programs must have in order to exist within it.

So - what do JavaScript programs need?

### 1) A [global execution environment](https://tc39.es/ecma262/#sec-global-environment-records)

In JavaScript, there can be many different scripts running in the same environment. 
Scripts can form [scopes](https://developer.mozilla.org/en-US/docs/Glossary/Scope) which are canonical execution environments in which values and expressions are "visible" or can be referenced. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa:

```html
<script>
    (function scope1() {
        const x = 1;
        (function scope2() {
            const y = x + 2; // 3
        }());
        const z = x + y;  // Uncaught ReferenceError: y is not defined
    }());
</script>
```

In the example above we show how a scope can be defined using JavaScript. 
But what if we write a JavaScript program that also declares variables, and does so without actually declaring a scope?

This is known as a "top level declaration" - everything that is declared (or runs in general) outside of any defined scope is under the default [outer-most scope](https://tc39.es/ecma262/#sec-global-environment-records), which is the **global** execution environment.

Variables declared under this outer-most scope are shared among the different scripts under the global execution environment:

```html
<script> const x = 1; </script>
<script> const y = 2; </script>
<script> const z = x + y; // 3 </script>
```

> *A realm provides the JavaScript program with its own single global execution environment.*

The examples above use `const`, which populates new definitions in what is known as the ["declarative environment"](https://tc39.es/ecma262/#sec-declarative-environment-records), alongside `let`, `class`, `module`, `import`, and/or `function` declarations.

All other ways of creating new definitions fall under what is knowns as the ["object environment"](https://tc39.es/ecma262/#sec-object-environment-records), which includes `var`, `function`, `async function`, `function*`, `async function*` (the `*` representing the generator function).

> Be aware of that the effect different declarations statements have over the global object through the "object environment" drifts from the above explanation when JavaScript code executes under [`use strict;`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) mode and/or when it executes as [module code](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) rather than script code!

Both the “declarative environment” and the “object environment” together make up the aforementioned global execution environment.

The "object environment", in addition to the above, also provides all of what are known as ["built-in global objects"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) due to its base object being what is known as the "global object".

### 2) A [global object](https://tc39.es/ecma262/#sec-global-object) (and [intrinsic objects](https://tc39.es/ecma262/#sec-well-known-intrinsic-objects))

After having a proper environment in which JavaScript programs can execute, they also need to be able to perform advanced operations, including but not limited to platform based ones. 

The global object provides access to built-ins such as different intrinsics, objects, APIs, etc (whether platform specific or not) that enrich and enable it to be fuller-featured and more useful.

> *The global object is referenced as [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) for browsers and [`global`](https://nodejs.org/api/globals.html#globals_global) for NodeJS environments; in both, [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) can also be used.*

To start with the non platform based ones, the global object exposes some built-in intrinsic objects: 
1. [values](https://tc39.es/ecma262/#sec-value-properties-of-the-global-object) (e.g. `undefined`, `Infinity`, etc);
2. [functions](https://tc39.es/ecma262/#sec-function-properties-of-the-global-object) (e.g. `eval`, `parseInt`, etc);
3. [constructors](https://tc39.es/ecma262/#sec-constructor-properties-of-the-global-object) (e.g. `Boolean`, `Date`, etc);
4. and [others](https://tc39.es/ecma262/#sec-other-properties-of-the-global-object) (e.g. `JSON`, `Math`, etc)

In addition to those, the global object also exposes different platform specific APIs. 
In the browser for example there are `fetch`, `alert`, `document` and more.

The [`DOM`](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), for example is a well known browser specific API that is exposed via the global object, and here too every realm has its own unique separate DOM.

In the context of the "global execution environment" section, in addition to these built-ins, the global object also exports anything that was declared under the "object environment":

```javascript
// `const` declrations fall under the "declarative environment"
const constant = 1;

// and therefore they are not accessible via the global object
console.log(window.constant); // undefined

// however,

// `var` declrations fall under the "object environment"
var variable = 2;

// and therefore they are accessible via the global object
console.log(window.variable); // 2
```

> *Any platform specific objects and APIs are accessible via the global object along with all intrinsic objects and new properties declared by code.*

### 3) JavaScript itself

The last thing that can be associated with a realm is the JavaScript code that runs within the execution environment of that realm.

Any changes/alternations/updates to the execution environment, the global object or anything that is derived under a realm, is also associated exclusively with that realm.

## Grasp the concept of what realms really are

Congratz 🎉 for making it through the boring technical definition part - now's the less formal part where it'll all click!

### Realms in "real life"

As mentioned before, realms is a JavaScript concept and is not exclusive to browsers, but I will stick to browsers in my explanation.

Now that we defined what realms are, it's time to "put a face to the name".

In the browser, by default there is only one realm and that is the [top](https://developer.mozilla.org/en-US/docs/Web/API/Window/top) main realm. That is the realm where the web app that the browser loaded lives.

As we just learned, the web app lives within that realm which provides it with a global execution environment, an outer-most scope and a global object that grants access to different intrinsic objects, platform specific APIs, etc.

However, new realms can be created by the web app and co-exist - and every new realm will have **its own separate and unique set of everything mentioned above.**

Every realm lives inside what is known as an [agent](https://tc39.es/ecma262/#sec-agents), and an agent can be the parent of multiple realms.
Realms can have child or sibling realms.

> Agents will be covered in a different post. All there is to know is that an agent is an entity with different resources it provides to the realm/s it hosts (e.g. the [event loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)).

In the browser, realms can be created in various ways and whether they'll be the child of the same agent or not depends on the nature of the realms and the relationship they have with each other. Here are some examples:

1. Two [iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) (either parent and child or siblings) of the same origin will form two realms under a single agent.
2. Two [iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) (either parent and child or siblings) of two different origins will form two realms under separate agents (furthermore, to keep cross origin site isolation, the parent agents of the two realms are children to separate [agent clusters](https://tc39.es/ecma262/#sec-agent-clusters) which run in different processes).
3. The top main realm and a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) are two realms under separate agents under a single agent cluster (so is a [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)).

Those relationships also dictate to what extent realms can communicate with one another. 

Same origin iframe realms share a single event loop and can access each others environment synchronously and freely using the [`contentWindow`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow) property:

```javascript
// https://example.com
const ifr = document.createElement('iframe');
ifr.src = 'https://example.com'; // same origin
ifr.onload = () => {
    console.log(ifr.contentWindow.document.body);
    // <body></body>
}
document.body.appendChild(ifr);
```

But cross origin iframe realms get much more limited access using the same API:

```javascript
// https://example.com
const ifr = document.createElement('iframe');
ifr.src = '//cross.origin.com'; // cross origin
ifr.onload = () => {
    console.log(ifr.contentWindow.document.body);
    // Uncaught DOMException: Blocked a frame with origin "https://example.com" from accessing a cross-origin frame.
}
document.body.appendChild(ifr);
```

Cross origin realms can still communicate with each other, but the communication is more limited and is based on the [postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) asynchronous API. This also applies when trying to communicate with web workers, service workers, etc.

> *It is worth mentioning that different and interesting complimentary solutions to some of the limitations described here will be introduced shortly once the famous [shadow realms proposal](https://github.com/tc39/proposal-shadowrealm/blob/main/explainer.md) lands - worth staying tuned on that!*

#### The uniqueness of each realm is a great way to better grasp the idea of what a realm is.

If for example we load the following website:

```html
<html>
    <head></head>
    <body>
        <iframe id="some_iframe"></iframe>
    </body>
</html>
```

Then there are two different realms - the top main realm, and the new realm within the iframe, so that each realm has its own unique identity with a unique global object and a global execution environment:

```javascript
window === some_iframe.contentWindow // false
```

And each realm has its own set of intrinsic objects and platform based APIs:

```javascript
window.fetch === some_iframe.contentWindow.fetch // false
window.Array === some_iframe.contentWindow.Array // false
```

```html
<html>
    <script> 
        window.top_array = []; 
    </script>
    <iframe> 
        <script> 
            window.top.iframe_array = []; 
        </script> 
    </iframe>
    <script>
        // top_array and iframe_array were born in different realms
        Object.getPrototypeOf(window.iframe_array) === Object.getPrototypeOf(window.top_array) // false
    </script>
</html>
```

[Primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), however, are identical across realms:

```javascript
window.Infinity === some_iframe.contentWindow.Infinity // true
```

### Identity discontinuity

Identity discontinuity is a state that can only be achieved due to the existence of realms as a feature, which helps in emphasizing how unique they are.

To demonstrate the concept properly we'll use the [`instanceof` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof).

Imagine we have a third party service that creates blue buttons and is loaded via an iframe (for whatever reason), so that the web app consumes its services as follows:

```html
<html>
    <iframe id="blue_buttons_iframe">
        <script>
            window.top.createBlueButton = function(text) {
                const button = document.createElement('button');
                button.style.color = 'blue';
                button.value = text;
                return button;
            };
        </script>
    </iframe>
    <body>
        <script>
            const blueButton = window.createBlueButton('my blue button');
            if (!blueButton instanceof HTMLButtonElement) {
                throw new Error('blue button created does not seem to actually be a button element!');
            }
            document.body.appendChild(blueButton);
        </script>
    </body>
</html>
```

With `instanceof`, you can tell whether what's on the left of the operator is an instance of what's on its right. So for example, since `button` elements are instances of the `HTMLButtonElement` interface, the result for `document.createElement('button') instanceof HTMLButtonElement` is `true`, whereas the result for `document.createElement('div') instanceof HTMLButtonElement` is `false` - because a `div` element inherits from `HTMLDivElement` and not the `HTMLButtonElement`, obviously.

However, in our example the `instanceof` check will return `false` and the custom error will be thrown - even though `blueButton` inherits from `HTMLButtonElement`.

How's that possible? This happens because inheriting from `HTMLButtonElement` in general is not enough to count as an "instance of" - **the tested object must be an instance of the interface from the specific realm it came from in the first place.**

The intention of the `instanceof` check originally was to make sure that the blue buttons third party service really provided a button element and nothing else, but in reality the blue button is created in a different realm from where the `HTMLButtonElement` interface comes from and therefore the `instaceof` check will forever return `false`.

The described bug is due to the introduction of identity discontinuity to the code which goes to show how unique are realms and everything they provide.

Solving identity discontinuity is not always trivial. In the example above, changing the check into `blueButton instanceof blue_buttons_iframe.contentWindow.HTMLButtonElement` would have fixed the issue, but that is not a scalable nor a convenient solution.

> *In order for an object to be an instance of an interface, the object must be created at/derived from the exact realm of that interface.*

## In summation

I came up with this content because I couldn't find any useful, accurate and understandable information on what realms are and what defines them. It was crucial to understand realms fully in order for me to dive deeper into the role of realms in supply chain attacks and security in general - I hope you find this useful as well.

You can always catch up on my research and development of the field on the [awesome-JavaScript-realms-security](https://github.com/weizman/awesome-JavaScript-realms-security/) repo.

I also recommend you learn more about the [LavaMoat 🌋](https://github.com/lavamoat) tool [Snow-JS ❄️](https://github.com/lavamoat/snow) to further understand the defensive security effort around securing JavaScript realms.
