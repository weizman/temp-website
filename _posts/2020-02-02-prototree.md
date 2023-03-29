---
enabled: false
layout: post
tags: Browser,Top,MetaMask,LavaMoat,CVEs,Vulnerabilities,Security,JavaScript,Research,Anti-Debug,Videos,Published,Podcasts,Posts,News,Supply-Chain-Security
title: Proto Tree 🌳
url: https://weizman.github.io/
date: 27/03/2023
description: I mapped the entire prototype chain in JavaScript as a tree!
keywords: research, prototype, chain, security, iframe, window, JavaScript, tree
image: snow-metamask-2.jpg
---

## The prototype chain in JavaScript

There isn't anything new to add when mentioning the [prototype chain in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).
It is a core concept in the language that developers are encouraged to learn when are first introduced to it.

Which is why I find it really surprising that there is no online reference to the full chain to be learned and explored!

I mean, references are there for specific cases - here's what you see when going on [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) for example:

<img width="784" alt="Screenshot 2023-03-24 at 15 36 31" src="https://user-images.githubusercontent.com/13243797/227522964-562f4f15-2fc9-4a15-ac3a-bbf08ad256cf.png">

If you notice the bottom line you'd see `Event <- UIEvent <- MouseEvent` which demonstrates the inheritance chain that describes `MouseEvent` specifically.

However, a full list of the entire chain of everything that is accessible via JavaScript is not to be found online (correct me if I'm wrong!).

Probably because it's not trivial to generate it - not only that the full chain itself is massive, but also because the chain is dynamic and is affected 
by multiple factors to consider:

1. Should the chain take into consideration pure JavaScript only (`Array`, `Object`, `Function`, etc)? Or platform specific APIs as well (`fetch`, `document`, etc)?
2. The chain changes depends on the environment - different browsers output different chains.
3. The chain changes on non-pure environments (if an extension in installed in the browser for example, it will probably pollute the chain).

Kind of an interesting problem!

## ProtoTree 🌳

As a JavaScript security researcher, I found myself needing to understand different parts of the chain in multiple occasions, but was frustrated again
and again from not having full visibility into it.

Working at [MetaMask](https://github.com/metamask/), I am fortunate enough to work on highly advanced JavaScript tools (mostly for security), 
and I'm also lucky enough to have these tools serve the world openely and for free.

LavaTube is an excellent example.

### LavaTube 🌋

[LavaTube](https://github.com/lavamoat/lavatube) is a tool we created which is part of the [LavaMoat](https://github.com/lavamoat) toolbox.

There's still some work to to there to make it more than an experimental tool, but it's highly useful for 

[WIP]


