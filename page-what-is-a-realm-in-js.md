---
layout: page
title: What is a realm in javascript?
url: https://weizman.github.io/
date: 28/10/2022
description: An easy to understand explanation of what realms are in javascript
keywords: research, realms, security, iframe, window, javascript
---

As part of my long term research around browser javascript security, in the past year I have been focusing specifically on [security for realms ⭐️](https://github.com/weizman/awesome-javascript-realms-security).

Due to the rise of dependencies based development, the javascript ecosystem (and the browser javascript ecosystem in particular) is far more vulnerable to what we know as ["supply chain attacks"](https://en.wikipedia.org/wiki/Supply_chain_attack) - and the ability to create new realms in javascript is being leveraged to successfully carry out such attacks against web apps (if you want to understand why is that I recommend reading [my previous post](https://twitter.com/WeizmanGal/status/1576942106156810240) on this).

The realms security field is far from being properly addressed, and I hope to gradually fix that starting buy later introducing the first open source realms security tool - [Snow-JS ❄️](https://github.com/lavamoat/snow) by [LavaMoat 🌋](https://github.com/lavamoat).

But in order for any of this to make sense, we must first understand **what realms are** - and apparently that's not an easy question to answer in a correct yet an **informal** and educational way.

> *NOTE: The context of this post is focused around browser javascript, therefore it may apply to javascript in general but that is not guaranteed.*

## A [realm](https://tc39.es/ecma262/#sec-code-realms) - the world where javascript lives 

You can informally think of a realm as basically an ecosystem in which a javascript program lives. And just like any other ecosystem, it includes different elements that javascript programs must get in order to exist within it.

So - what do javascript programs need?

### 1) A [global execution environment](https://tc39.es/ecma262/#sec-global-environment-records)

In javascript, there can be many different scripts running in the same environment. 
Scripts can form scopes which are canonical execution environments where inner scopes can access variables of outer scopes, but not the other way around:

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

In the example above we show how a scope can be defined using javascript, but what if we write a javascript program that also declares variables, but does so without actually declaring a scope?

This is known as "top level declarations" - everything that is declared (or runs in general) outside of any defined scopes is under the default [outer most scope](https://tc39.es/ecma262/#sec-global-environment-records), which is the **global** execution environment.

Variables declared under this outer most scope are shared among the different scripts under the global execution environment:

```html
<script> const x = 1; </script>
<script> const y = 2; </script>
<script> const z = x + y; // 3 </script>
```

> *A realm provides the javascript program with its own single global execution environment.*

The examples above use `const` which populates new definitions in what is known as the ["declarative environment"](https://tc39.es/ecma262/#sec-declarative-environment-records), alongside `let`, `class`, `module`, `import`, and/or `function` declarations.

The rest of the possible ways for new definitions fall under what is known as the ["object environment"](https://tc39.es/ecma262/#sec-object-environment-records),
which includes `var`, `function`, `async function`, `function*`, `async function*` (the `*` representing the generator function).

Both the "declarative environment" and the "object environment" together are what the mentioned global execution environment is composed of.

The "object environment", in addition to the above, also provides all of what are known as ["builtin global objects"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) due to its base object being what is known as the "global object".

### 2) A [global object](https://tc39.es/ecma262/#sec-global-object) (and [intrinsic objects](https://tc39.es/ecma262/#sec-well-known-intrinsic-objects))

After having a proper environment for javascript programs to execute within, they also need to be able to perform advanced operations, including but not limited to platform based ones. 

The global object provides access to builtins such as different intrinsics, objects, APIs, etc (whether platform specific or not) that enrich and utilize it to be richer and more useful.

> *The global object is referenced as [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) for browsers and [`global`](https://nodejs.org/api/globals.html#globals_global) for NodeJS environments - in both [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) can also be used.*

To start with the non platform based ones, the global object exposes some builtin intrinsic objects: 
1. [values](https://tc39.es/ecma262/#sec-value-properties-of-the-global-object) (e.g. `undefined`, `Infinity`, etc);
2. [functions](https://tc39.es/ecma262/#sec-function-properties-of-the-global-object) (e.g. `eval`, `parseInt`, etc);
3. [constructors](https://tc39.es/ecma262/#sec-constructor-properties-of-the-global-object) (e.g. `Boolean`, `Date`, etc);
4. and [others](https://tc39.es/ecma262/#sec-other-properties-of-the-global-object) (e.g. `JSON`, `Math`, etc)

In addition to those, the global object also exposes different platform specific APIs. 
In the browser for example there are `fetch`, `alert`, `document` and more.

The [`DOM`](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) for example is a well known browser specific API that is exposed via the global object, and here too every realm has its own unique separate DOM.

In the context of the "global execution environment" section, in addition to these builtins, the global object also exports anything that was declared under the "object environment":

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

### 3) Javascript itself

The last thing that can be associated with a realm is the javascript code that runs within the execution environment of that realm.

Any changes/alternations/updates to the execution environment, the global object or anything that is derived under a realm is also accossiated exclusively with that realm.

## Grasp the concept of what realms really are

Congratz for making it through the boring technical defintion part - now's the less formal part where it'll all click!

### Realms in "real life"

As mentioned before, realms is a javascript concept and is not exclusive to browsers, but I will stick to browsers in my explanation.

Now that we defined what realms are, it's time to "put a face to the name".

In the browser, by default there is only one realm and that is the [top](https://developer.mozilla.org/en-US/docs/Web/API/Window/top) main realm. That is the realm where the web app that the browser loaded lives.

As we just learned, the web app lives within that realm which provides it with a global execution environment, an outer most scope and a global object that grants access to different intrinsic objects, platform specific APIs, etc.

However, a new realm can be created to be living within the top main realm and that realm will have **its own separate and unique set of everything mentioned above**.

In the browser that can be achieved in different ways. [Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), [iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), etc - all of those rise up when created with their own realm.

**The uniqueness of each realm is a great way to better grasp the idea of what a realm is.**

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

[Primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) however are identical across realms:

```javascript
window.Infinity === some_iframe.contentWindow.Infinity // true
```

### Cross realms access

In the examples above we use the property [`contentWindow`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow) to demonstrate how realms are unique and how they expose similar yet not identical objects. `contentWindow` is a property that exposes the global object (`window`) of another realm for sync interaction.

It can be used for new realms of iframes or tabs ([`open()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) API), however sync access can be very limited based on whether the accessing realm is in the [same origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) as the accessed realm or not.

Realms created within web workers or service workers are not accessible in such manner.

All realms are accessible through more limiting async communication channels such as [postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) API.

## To sum up

I came up with this content because I couldn't find any useful, accurate and understandable information on what realms are and what defines them. It was crucial to understand realms fully in order for me to dive deeper into the role of realms in supply chain attacks and security in general - I hope you find this useful as well.

You can always catch up on my research and development of the field on the [awesome-javascript-realms-security](https://github.com/weizman/awesome-javascript-realms-security/) repo.

I also recommend you learn more about [LavaMoat 🌋](https://github.com/lavamoat) tool [Snow-JS ❄️](https://github.com/lavamoat/snow) to further understand the defensive security effort around securing javascript realms.
