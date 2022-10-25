---
layout: page
title: What is a realm in javascript?
url: https://weizman.github.io/
date: 28/10/2022
description: An easy to understand explanation of what realms are in javascript
keywords: research, realms, security, iframe, window, javascript
---

As part of my long term research around browser javascript security, in the past year I have been focusing specifically on [security for realms ⭐️](https://github.com/weizman/awesome-javascript-realms-security).

Due to the rise of dependencies based development, the javascript ecosystem (and the browser javascript ecosystem in particular) is far more vulnerable to what we know as "supply chain attacks" - and the ability to create new realms in javascript is being leveraged to successfully carry out such attacks against web apps (if you want to understand why is that you should read [my following post](/) about this, but it will be hard if you don't yet feel comfortable with the definition of a "realm").

The realms security field is far from being properly addressed, and I hope to gradually fix that starting buy later introducing the first open source realms security tool - [Snow-JS ❄️](https://github.com/lavamoat/snow) by [LavaMoat 🌋](https://github.com/lavamoat).

But in order for any of this to make sense, we must first understand **what realms are** - and apparently that's not an easy question to answer in a correct yet an **informal** and educational way.

> *NOTE: The context of this post is focused around browser javascript, therefore it may apply to javascript in general but that is not guaranteed.*

## A realm - the world where javascript lives 

You can informally think of a realm as basically an ecosystem in which a javascript program lives. And just like any other ecosystem, it includes different elements that javascript programs must get in order to exist within it.

So - what do javascript programs need?

### 1) A global execution environment

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

This is known as "top level declarations" - everything that is declared (or runs in general) outside of any defined scopes is under the default outer most scope, which is the **global** execution environment.

Variables declared under this outer most scope are shared among the different scripts under the global execution environment:

```html
<script> const x = 1; </script>
<script> const y = 2; </script>
<script> const z = x + y; // 3 </script>
```

> *A realm provides the javascript program with its own single global execution environment.*

The examples above use `const` which populates new definitions in what is known as the "declarative environment", alongside `let`, `class`, `module`, `import`, and/or `function` declarations.

The rest of the possible ways for new definitions fall under what is known as the "object environment",
which includes `var`, `function`, `async function`, `function*`, `async function*` (the `*` representing the generator function).

Both the "declarative environment" and the "object environment" together comprise the mentioned global execution environment.

The "object environment", in addition to the above, also provides all of what are known as "builtin globals" due to its base object being what is known as the "global object".

### 2) A global object (and intrinsic objects)

After having a proper environment for javascript programs to execute within, they also need to be able to perform advanced operations, including but not limited to platform based ones. 

The global object provides access to builtins such as different [intrinsics](https://tc39.es/ecma262/#sec-well-known-intrinsic-objects), objects, APIs, etc (whether platform specific or not) that enrich and utilize it to be richer and more useful.

> *The global object is referenced as `window` for browsers and `global` for NodeJS environments - in both `globalThis` can also be used.*

To start with the non platform based ones, the global object exposes some builtin intrinsic objects: 
1. [values](https://tc39.es/ecma262/#sec-value-properties-of-the-global-object) (e.g. `undefined`, `Infinity`, etc);
2. [functions](https://tc39.es/ecma262/#sec-function-properties-of-the-global-object) (e.g. `eval`, `parseInt`, etc);
3. [constructors](https://tc39.es/ecma262/#sec-constructor-properties-of-the-global-object) (e.g. `Boolean`, `Date`, etc);
4. and [others](https://tc39.es/ecma262/#sec-other-properties-of-the-global-object) (e.g. `JSON`, `Math`, etc)

In addition to those, the global object also exposes different platform specific APIs. 
In the browser for example there are `fetch`, `alert`, `document` and more.

In the context of the "global execution environment" section, in addition to these builtins, the global object also exports anything that was declared under the "object environment":

```javascript
const constant = 1; // `const` declrations fall under the "declarative environment"
console.log(window.constant); // undefined (therefore they are not accessible via the global object)

var variable = 2; // `var` declrations fall under the "object environment"
console.log(window.variable); // 2 (therefore they are accessible via the global object)
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

In the browser, by default there is only one realm and that is the top main realm. That is the realm where the web app that the browser loaded lives.

As we just learned, the web app lives within that realm which provides it with a global execution environment, an outer most scope and a global object that grants access to different intrinsic objects, platform specific APIs, etc.

However, a new realm can be created to be living within the top main realm and that realm will have **its own separate and unique set of everything mentioned above**.

In the browser that can be achieved in different ways. Web workers, iframes, service workers, etc - all of those rise up when created with their own realm.

The uniqueness of each realm is a great way to better grasp the idea of what a realm is.

If for example we load the following website:

```html
<html>
    <head></head>
    <body>
        <iframe></iframe>
    </body>
</html>
```

Then there are two different realms - the top main realm, and the new realm within the iframe, so that:

```javascript
const ifr = document.body.appendChild(document.createElement('iframe')).contentWindow;
```

Each realm has its own unique identity with a unique global object and a global execution environment:

```javascript
window === ifr.contentWindow // false
```

And each realm has its own set of intrinsic objects and platform based APIs:

```javascript
window.fetch === ifr.contentWindow.fetch // false
window.Array === ifr.contentWindow.Array // false
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

### Cross realms access

In the examples above we use the property `contentWindow` to demonstrate how realms are unique and how they expose similar yet not identical objects. `contentWindow` is a property that exposes the global object (`window`) of another realm.

It can be used for new realms of iframes or tabs (`open()` API), however access can be very limited based on whether the accessing realm is in the same origin as the accessed realm or not.

Realms created within web workers or service workers are not accessible in such manner.

> *To learn more about realms it is advised to keep track with the educational [awesome-javascript-realms-security](https://github.com/weizman/awesome-javascript-realms-security/) repo and to learn more about realms security make sure to check the [LavaMoat 🌋](https://github.com/lavamoat) tool [Snow-JS ❄️](https://github.com/lavamoat/snow).*

