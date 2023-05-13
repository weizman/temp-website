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

### LavaMoat

This was [already communicated](https://metamask.io/news/security/using-lavamoat-to-solve-software-supply-chain-security/) 
multiple times online, so I won't go too much into details today, but the bottom line is 
that **MetaMask is putting more effort than most of the world into securing the client side of web applications in all sorts of ways.** 

We call this initiative [the LavaMoat toolbox](https://github.com/lavamoat/) in which we focus on the **security side of JavaScript and the client 
side apps we build on top of it**, where we face some interesting and very unique challenges.

We previously covered some of the tools in the toolbox:
* LavaMoat - [Using LavaMoat To Solve Software Supply Chain Security](https://metamask.io/news/security/using-lavamoat-to-solve-software-supply-chain-security/)
* Snow - [Introducing Snow - Securing Nested Ownership of Windows](https://github.com/lavamoat/snow/wiki/Introducing-Snow)

But today we'll talk about a smaller problem we had and the cool little experimental LavaMoat tool we built for facing it - **[LavaTube](https://github.com/LavaMoat/LavaTube/)!**

### The problem
