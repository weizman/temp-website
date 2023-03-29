---
enabled: true
layout: post
title: Integrating Snow ❄️ into MetaMask 🦊
url: https://weizman.github.io/
date: 18/11/2022
description: Argument in favor of integrating LavaMoat's Snow into MetaMask
keywords: research, realms, security, iframe, window, JavaScript, MetaMask, LavaMoat, Snow, supply chain attacks
image: snow-metamask-2.jpg

---

> _By [Gal Weizman](https://github.com/weizman) [@MetaMask](https://github.com/metamask)_

In this document I will be arguing in favor of integrating the new and advanced [Snow JS ❄️](https://github.com/lavamoat/snow) browser security technology into the [MetaMask 🦊 browser extension](https://github.com/MetaMask/metamask-extension).

> _tl;dr_

* Supply chain attacks is a massive problem against javascript based web apps including MetaMask.
* MetaMask introduces advanced technology LavaMoat to isolate dependencies from each other using SES technology, and by that take a big step towards providing strong supply chain attacks protection tools.
* However, LavaMoat does not apply its protection automatically to all child realms but rather only to the top main realm.
* Meaning, if an attacker manages to escape LavaMoat's sandbox, they can easily go around the protection it applies to the top main realm by using a child realm.
* Snow is a tool that allows you to automatically take over all newborn child realms in the web app and execute predefined code on all of them at the time of their creation.
* By instructing Snow to execute LavaMoat's top main realm protection, it'll apply it to all child realms by default and by that introduce a second layer of security to the app LavaMoat defends (e.g. MetaMask).
  * *At the time of this writing, Snow is still experimental and yet to be integrated into MetaMask (but will soon!)*
* In the same manner, Snow can help protect any web app, and can also be used for many other use cases, but it has downsides due to it still being new and experimental that should be taken into consideration.

## Table of contents

* [The problem](#the-problem)
  * [Supply chain attacks](#supply-chain-attacks)
  * [How supply chain attacks may affect MetaMask?](#how-supply-chain-attacks-may-affect-metamask)
* [The existing solution (layer 1)](#the-existing-solution-layer-1)
  * [LavaMoat](#lavamoat)
  * [How LavaMoat helps MetaMask against supply chain attacks?](#how-lavamoat-helps-metamask-against-supply-chain-attacks)
* [The problem with the existing solution (layer 1)](#the-problem-with-the-existing-solution-layer-1)
  * [How would a bypass of LavaMoat look like?](#how-would-a-bypass-of-lavamoat-look-like)
  * [What can an attacker do after bypassing LavaMoat in MetaMask?](#what-can-an-attacker-do-after-bypassing-lavamoat-in-metamask)
  * [Why realms is such a big security concern?](#why-are-realms-such-a-big-security-concern)
* [The missing solution (layer 2)](#the-missing-solution-layer-2)
  * [Snow](#snow)
  * [How Snow helps against supply chain attacks?](#how-snow-helps-against-supply-chain-attacks)
  * [Downsides and pitfalls of Snow - what's the trade off?](#downsides-and-pitfalls-of-snow---whats-the-trade-off)
* [Snow outside of MetaMask and supply chain attacks](#snow-outside-of-metamask-and-supply-chain-attacks)
* [Bottom line](#bottom-line)

## The problem

The context of this document is around the supply chain attacks problem, which is considered to be one of the **biggest
security concerns in the world of js apps** of all sorts (web apps, servers, extensions, etc).

Although supply chain attacks as mentioned above is a problem relevant to all sorts of js web apps, the context of this
document is around browser based apps specifically (websites, web apps, extensions, etc).

### Supply chain attacks

Refers to the breaching and leveraging of the app's supply chain to carry out an attack in the app's runtime.
Imagine app `X` uses dependency `a` which uses dependency `b` which uses dependency `c`:

```
X
 * a
  * b
   * c
```

Each of these dependencies can be completely seperate from another in terms of maintainers, purpose, maintaince and so on.
A defintion to a supply chain attack in this scenario would be for example if a **malicious entity managed to alter the code base of any one of these deps without really being the legitimate entity that is in fact responsible for it.**

By doing so, the malicious entity will successfully execute its code when the app runs, because the app ultimately consumes all of the above deps, including the one the attacker managed to alter.

So to put it in simple words, if I own `facebook.com` web app and rely on a third party package called `dark-buttons` 
to make the buttons in the app darker, and that package is breached by someone else who adds a code that in addition to 
darkening buttons steals the logged in user's cookies, that would count as a calssic supply chain attack.

The reason supply chain attacks are problematic in the js ecosystem also lies in how all pieces of js code that run in a certain context have almost the same privileges - whether they are of the app itself or of a dependency the app consumes, 
they all have similar access to DOM, storage, network, etc.

### How supply chain attacks may affect MetaMask?

With MetaMask it's not very different. 

Eventually, MetaMask being a browser extension means it is effectively a web app that is 
also built on top of dependencies it does not control and therefore is vulnerable to supply chain attacks just as much.

With MetaMask you might say it is even more dangerous - **being an app that serves in an ecosystem that has no centralized 
authority where actions being made are far less "reversible", the security responsibility of the web wallet is crucial.**

To give an example in the context of MetaMask, if a third party package MetaMask uses is breached and an attacker manages to
run code in the context of the extension itself, **it can leverage such privilage to do horrible irreversible things** such as steal the private key of the victim, sign transactions on their behalf, hiddenly switch public keys the victim wishes
to interact with, and far more.

## The existing solution (layer 1)

As far as I understand it, this was (more or less) the thought process MetaMask went through which lead to creating LavaMoat
to attempt to solve just that.

### LavaMoat

[LavaMoat](https://github.com/lavamoat/lavamoat) is a security tool by MetaMask that attempts to introduce a layer of defense
to javascript based web apps specifically against supply chain attacks.

In the context of browser based apps, LavaMoat participates in the build process and uses advanced technology such as [SES](https://github.com/endojs/endo) and static analysis of code to wrap each dependency the app uses with a sandbox that
makes sure the **dependency can only do what it's suppose to do.**

It is important to calrify that this is a very high level and general way to describe LavaMoat, and since it is out
of this document's scope to thoroughly explain it, you should read more about it in case you are not yet familiar with it.

So if to put this in the context of the example from above, if package `c` is maybe a tool for abstracting access to the DOM
but is breached to also steal cookies from storage and exfiltrate them to a malicious origin using network APIs - if app `X` 
is protected by LavaMoat it will allow `c` to access the DOM as usual, but will block it from accessing the storage
or different network APIs since it should not have access to them normally.

And by that LavaMoat in fact helps a lot in **managing API access privilages for app dependencies** - in this example,
**without LavaMoat such breach would have been successful, but thanks to LavaMoat it is not.**

### How LavaMoat helps MetaMask against supply chain attacks?

With MetaMask it's not very different (again).

LavaMoat just does its magic similarly to the example described above with MetaMask and its dependencies. 
You can investigate the policy file that LavaMoat generates to learn which packages of MetaMask can access which APIs.

For example, `textarea-caret` package used by MetaMask is dictated by [LavaMoat's policy file](https://github.com/MetaMask/metamask-extension/blob/100fbbfaca55ad6735432a897a38c9889a5f3d1d/lavamoat/browserify/main/policy.json#L6287) to only have access to a specific number of APIs (most of them are DOM related).

This effectively means that before we had LavaMoat, if `textarea-caret` package was compromised it could have allowed to run
fully privilaged malicious code that could have easily be leveraged to carry out attacks such as described above against MetaMask users.

But LavaMoat's protection prevents that exactly.

## The problem with the existing solution (layer 1)

"Problem" is a strong word. LavaMoat does its job and it does so wonderfully.

But LavaMoat is a single line of defense, and having multiple lines of defense is better than having just one.

**LavaMoat's protection level is fairly high, and breaching it is currently very difficult.**
But as we already learned in the security space, it can never be guaranteed to stay the case for good - **someone at some point might find a way around it.**

### How would a bypass of LavaMoat look like?

Bypassing LavaMoat would mean having **a package with limited privileges obtaining access to objects and APIs out of its privileges scope.**

To explain more simply, it's as if `textarea-caret` could leverage the APIs it can currently access according to LavaMoat
to access other APIs provided by the browser that it shouldn't have access to.

So if for example `textarea-caret` only have access to `[document.createElement, document.body.appendChild]`
and it can leverage those to obtain access to `fetch` API - that would be a clear vulnerability exploitation of LavaMoat.

### What can an attacker do after bypassing LavaMoat in MetaMask?

In such a scenario, **access to forbidden APIs may result in the attacker carrying out attacks** such as described earlier.

A bypass to LavaMoat can result in the **malicious package obtaining full privilge to all APIs provided by the browser, and
such power can allow an attacker to cause a lot of damage.**

There are ways to defend against a scenario where the attacker bypasses LavaMoat and gains full access to the global object 
and by that to all the browser APIs it provides.

One [WIP](https://github.com/LavaMoat/LavaMoat/pull/360) approach is called "scuttling the start compartment globalThis" suggested by [@Aaron Davis](https://github.com/kumavis).

The idea here is to erase access to all of the APIs the browser offers under the global object (`window`) and the
DOM object (`document`) completely, and by that **leave nothing to an attacker who manages to jump over LavaMoat to those 
dangerous APIs.** Each package with its own compartment (sadnbox) has access to their private version of those APIs, 
so erasing their original versions from the global object is in fact not the worst idea. 

However, even this won't be enough and that is due to another problem that is far harder to solve - the fact that 
**there isn't really only a single global object, there could be more than just one.**

### Why are realms such a big security concern?

To quote from the [official specification of Realms](https://tc39.es/ecma262/#sec-code-realms),

> _"A realm consists of a set of intrinsic objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources."_

And to add to the above, all of those are accessible by the realm's global object (`globalThis`).
In the browser that object can be accessed via `window` and by default there is only one main realm
which is the top window and can also be accessed via `top`.

So to put things in context, everything we mentioned earlier that an attacker can do and that LavaMoat tries to defend
against is by **leveraging the basic access js code has to different APIs and objects that are assocciated to the relevant
realm** (which until this point in this document is the main (`top`) realm).

Meaning, 

* Attacker trying to abuse access to the DOM;
* Attacker trying to bypass LavaMoat to jump from DOM access (e.g. `document.createElement`) to network APIs (e.g. `fetch`);
* LavaMoat scuttling the globalThis of the start compartment to prevent attackers from gaining access to APIs they're not authorized to have access to,

All are hapening and are being discussed **under the context of the top main realm.**

So if to stick to the "scuttling" example, this means to perform scuttling to the top main realm.

This however gets very tricky based on the fact that **more realms can be created under the top realm.**
In the browser, a new realm can be created in the form of `iframe`s, `worker`s, tabs, `window`s and more, 
and naturally each realm has its own freshly new set of everything that is mentioned in the quote from the spec above.

Realms can be either same origin realms or cross origin realms, depends on whether the origin of the realm
is the same as the origin of the parent realm or not.

**In this context, same origin realms are a security concern in supply chain attacks.**

This is because an attacker can carry its planned **attack within a realm they create and control rather than the
top main realm, and by that go around any protections LavaMoat is trying to apply to it.**

In other words, if the scuttling process successfully disables access to the top main realm's `fetch` API, 
that doesn't apply by default to child realms an attacker might create/get a hold on.
**That type of attack can only leverage a same origin realm** and not a cross origin one, because same origin realms
are fully and synchronously accesible via the top main realm.

## The missing solution (layer 2)

While it is very unlikely (thanks to LavaMoat) an attacker can leverage a fully scuttled global object to create a new realm to attack with, applying general protections (such as but not limited to LavaMoat's scuttling) to any child realm that comes to life under the top main realm, recursively and automatically, would have been considered as a **strong second line of defense against a supply chain attacker.**

In other words, **if instead of only scuttling the global object of the top main realm, we could have done so to all realms of
all iframes, tabs, windows and so on, that would have been a great way to make sure an attacker cannot leverage a same origin
realm to carry out an attack against the app.**

So assuming an attacker wants to use `fetch` as part of an attack, but LavaMoat's scuttling disables access to `fetch` in the top main realm's global object - if the attacker manages to get a hold on a different same origin realm which by default is
unprotected by LavaMoat, **they can easily pull a freshly new `fetch` API from there and use that instead.**

Based on that, **the missing solution here is a tool that takes over the creation of new realms and grants first access to it
to the protector rather than the creator of the realm.**

With such a solution we could have applied the scuttling approach for example **not only to the top main realm, but to every new realm in the page automatically**, and then pulling a freshly new `fetch` API **would not have been possible anymore.**

However, covering all ways of new realms creation is **a very non trivial mission to accomplish** due to Javascript being Javascript. Therefore, creating such a tool is quite a complex task on its own.

To sum up so far, when defending a browser based app against supply chain attacks there are two missions to accomplish
in order to provide a truly advanced solution, and **each one is a difficult and complciated problem to solve**:

1. Creating a tool^ that applies protection against supply chain attacks;
2. Creating another tool that applies a subset of the first tool^ (or all of it) to all same origin realms in the app.

In the context of this document, **the former is provided by MetaMask and is LavaMoat**, whereas **the latter is yet to be
integrated with LavaMoat and is Snow** - the subject of this document.

### Snow

The following animation should give an idea of the importance of combining LavaMoat with Snow, as explained above:

* 1st frame - this is the initial stage where no protection applies to the web app and therefore all realms including the 
top main one are vulnerable to supply chain attacks.

* 2nd frame - at this stage we turn on LavaMoat as our supply chain attacks protection which attempts to protect the top main
realm.

* 3rd frame - here we use Snow to apply LavaMoat's protection to all future realms in addition to the top main realm.

![lavamoat-snow-animation](./content/img/snow-mm.gif)

Snow (stands for **S**ecuring **N**ested **O**wnership of **W**indows) is a browser javascript based security tool that focuses on providing an API to which you provide a callback that it'll guarantee to call for every new realm that is created in the web app (including the top main realm):

```javascript
SNOW(realm => delete realm.fetch);
```

This is a small demonstration of how to use Snow to delete `fetch` API not only from the top main realm, but from any new realm that comes to life in the app.

So if a certain app uses a certain protection around `fetch` to prevent attackers from using it, the attackers could leverage
a new realm to extract an unprotected `fetch` from there, but if the app instructs Snow to run its protection against all
new realms, an attacker won't be able to do so.

There is a clear demonstration of Snow's power in this [demo app](https://lavamoat.github.io/snow/demo/) that uses Snow to disable the `alert` API. The goal there is to run your own code in the app to successfully pop an alert message and by that show that Snow can be bypassed. 

Learn more about Snow outside of this document:

* [respository and source code](https://github.com/lavamoat/snow)
* [motivation behind Snow explained](https://github.com/lavamoat/snow/wiki/Introducing-Snow)
* [Snow's technical challenge explained](https://github.com/lavamoat/snow/wiki/Introducing-Snow#why-snow-solves-a-non-trivial-problem)
* [demo app - can you bypass Snow?](https://lavamoat.github.io/snow/demo/)
* [usage and installation](https://github.com/lavamoat/snow#usage)

### How Snow helps against supply chain attacks?

This is explained throughout this document a number of times, but the bottom line is that Snow allows you to **apply any dynamic protection you might create to all realms in the web app instead of just the top main one.**

It can be anything really, any type of protection you wish to apply to your web app can be carried out to future realms just as easy using Snow.

**Snow isn't a supply chain attacks protection tool of its own, it is the security assurance a real supply chain attack protection tool needs to protect all future realms attacker might try to leverage.**

### Downsides and pitfalls of Snow - what's the trade off?

At the time fo writing this document, **Snow is a very new and experimental security tech which is not yet used by anyone.**
That is why this document is called "Integrating Snow into MetaMask" - it is an initial step in making MetaMask the first
product ever to use Snow to protect itself.

It being so young is the exact reason for it having some early stages downsides:

1. **Snow is exclusively designed to run on Chromium based browsers** - developing a technology as complex as Snow requires a lot of specific handling and therefore methods that work in Chromium aren't guaranteed to work as smoothly on other browsers.
2. **Snow might introduce performance issues** - since Snow's focus is on creating a secured and hermatic solution against attackers, some of the hooks it applies to the page might be inefficient, so there's some work to do there also.
3. **Snow might not be as secure as we hope it is** - as part of this project it was clear that achieving the goal Snow aspires to achieve based on how dynamic and complex javascript can be might not be possible. This in fact brought us to believe that [Snow should be introduced into the browser as a builtin API](https://github.com/LavaMoat/snow/wiki/Introducing-Snow#snow-as-a-browser-builtin-api) and we will begin to put some effort into making this happen.

The third issue is an **important** one - **Until Snow isn't a builtin API it cannot commit to provide a fully secured solution** and that must be taken under consideration when choosing to use Snow. On the other hand, **using Snow is by far better then not, because it is the difference between protecting hopefully most realms created by attackers and none of them.**

## Snow outside of MetaMask and supply chain attacks

Snow is designed to be a **general purpose tool** and therefore is relevant to many more use cases outside of the context of this document.

**Snow can be used by more vendors other then just MetaMask, thanks to Snow providing the most dynamic API we could think of** - a callback to do with what ever you wish to do.

One can use Snow to create their own security tools or non security tools even.

A good example to that is [Across](https://github.com/lavamoat/across/) which is based on Snow and could not have been made without it. It has its own logic that it applies to the web app, and it **uses Snow to make sure its logic is applied across realms.**

## Bottom line

**Same origin realms are a big security concern ever since supply chain attacks became so common and so advanced.**

**Snow tries to be the first proper solution attempt to same origin realms being leveraged against supply chain attacks protection tools.**

**Snow is rather young but unlocks a great potential against supply chain attacks if used correctly.**

MetaMask can benefit a lot from combining LavaMoat existing solution with Snow missing solution to apply the power of LavaMoat to all realms in MetaMask rather then just the top main one, as it could be a **great line of defense** against an attacker who manages to bypass LavaMoat.
