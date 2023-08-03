---
enabled: true
layout: post
image: snow-stops-playing-nice.jpg
tags: Top,Security,JavaScript,Research,Supply-Chain-Security,Browser,MetaMask,LavaMoat
title: Snow stops playing nice - security first at the cost of everything else
url: https://weizman.github.io/
date: 03/08/2023
description: Today marks a big day in the life of Snow ❄️, where we come to the mature realization that in order for the project to stop chasing defensive security it has to take some bold steps at the cost of adoption and functional behaviour. Here, I attempt to lay out the process of trying, failing and learning the hard truth the hard way, and what should be our steps forward to find real security for same origin realms.
keywords: browsers, javascript, web, security, csp, research, Snow, iframe
---

_Taken from the Pull Request that introduces this significant change [#133](https://github.com/LavaMoat/snow/pull/133#Motivation)_

> _tl;dr - Today marks a big day in the life of [Snow](https://github.com/lavamoat/snow), where we come to the mature realization that in order for the project to stop chasing defensive security it has to take some bold steps at the cost of adoption and functional behaviour._
> _Here, I attempt to lay out the process of trying, failing and learning the hard truth the hard way, and what should be our steps forward to find real security for same origin realms._

In hindsight, the [#118](https://github.com/LavaMoat/snow/pull/118) effort was wrongly looked at partially.

Yes, requiring Snow users to integrate CSP (specifically disable `unsafe-inline` and same origin `object-src`s) to achieve full protection was **the right move**, but [#118](https://github.com/LavaMoat/snow/pull/118) was assuming that with such help from CSP Snow could continue the same "we do anything in our power to allow all sorts of ways of creating same origin realms" vibe.

Quickly after [#76](https://github.com/LavaMoat/snow/pull/76), which was heavily based on [#118](https://github.com/LavaMoat/snow/pull/118) thesis, it became clear that **the implementation was wrong** (thanks you [@mmndaniel](https://github.com/mmndaniel)) and that in fact [#118](https://github.com/LavaMoat/snow/pull/118) **did more damage than good** and still allowed most of the sophisticated vulns **bypass Snow**.

This brought us to the unfortunate realization that **the approach Snow kicked off with 1y ago is no longer viable** knowing what we know today about same origin realms, and that it's **time to adopt a less permissive but more promising approach**.

The dream originally was to create a shim that anyone can install taking 2 core rules into account:

1. **Protect ALL same origin realms**  (aka "1st rule") - no JS code should be able whatsoever to introduce a new same origin realm that goes under Snow's radar.

2. **Require little to zero adaptation**  (aka "2nd rule") - The website/web app to adopt Snow should do NOTHING more than installing it and passing it a callback. That means Snow must work perfectly regardless of what CSP is configured, and what crazy things the app might attempt to do - **Snow must not rely on any additional help from the website, nor break anything the JS in the website runs.**

I was inspired to create Snow after realizing how **big of an issue same origin realms are for third party vendors** trying to develop JS runtime protection tools for websites. It became clear to me that **all such tools will fail to accomplish their mission if they don't have full control over their same origin realms** ([I talk about that realization quite a lot](https://www.youtube.com/watch?v=l2l_qnEhx3M)). 

The 2nd rule was inspired by my experience with developing such third party tools specifically for websites, knowing how websites allow such wacky JS code to run in their site (a behaviour that doesn't seem to go anywhere in the near future), which requires such protection tools to be **as flexible and agnostic to its runtime environment as possible**, regardless of how crazy it might be (and websites are CRAZY). Naturally, if I'd wanted such third party security vendors to integrate Snow, **the 2nd rule was non-negotiable**.

And with that in mind, **Snow was created.**

Another important thing that happened in the past year was my introduction to the [@agoric](https://github.com/agoric) team and to [SES](https://github.com/endojs/endo/tree/master/packages/ses#ses).

Without getting to much into it, what you do need to know is that **SES is a successful attempt to export tools that when are used correctly can harden a given JS environment** against certain types of attack completely.

This specifically is something both SES and Snow share - **the identification of a certain (or a set of) security concern(s) and the attempt to form an environment that is resilient to it completely using a JS shim** (not to say the efforts and accomplishments of Snow and SES are comparable, that would be UNBELIEVABLY pretentious).

One distinction I had noticed though, was that SES took some choices that were naturally very limiting of the JS environment it was destined to run in, whereas this was the opposite from Snow's initial approach (aka the 2nd rule).

At first, I was rather glad that Snow didn't have to go down a similar path (SPOILER ALERT: As you can realize from reading this, **that isn't the case anymore**).

But now, 1y later, after being exposed to **so many vulnerabilities in Snow**, or more accurately - **SO MANY WAYS to create same origin realms** - it's more clear to me where the SES project was coming from.

If my original thinking was that at first priority **the adapting websites must remain fully agnostic to the existence of Snow** (2nd rule), I now understand that this **comes in the cost of security** (1st rule). And just like SES, I believe the **1st rule is far more important than the 2nd rule** (at least in this case), and that it's time to **change the prioritization of this project**.

This is yet another (quite long) way of saying:

With this PR, **Snow officially puts less effort in making sure websites don't break, and more effort in securing all same origin realms** from each other in the website.

This means that:

1. Bypassing Snow should become **significantly harder** (hopefully)
2. Snow might no longer allow certain operations to take place and instead **will throw an error to protect the page completely**. Most of these operations will still be rather unique and unneeded for the average website, but when they happen, **Snow will bail on the operation in sake of keeping the app protected.**
	
 	2.1. Also, Snow's protection **will still require CSP integration**, there's no escape from that ([#118](https://github.com/LavaMoat/snow/pull/118) was right about that).

This also means **Snow becomes less of a fit for traditional websites** (e.g. booking.com) and **third party vendors** aiming to be integrated in all sorts of wacky JS envs (e.g. PX CodeDefender), but a **better fit for those who can tolerate some initial Snow integration pain** in order to become a **truly same-origin-realms-attacks resilient app.**

Which is unfortunate considering this was the main target audience of Snow in the beginning, but this is what's right - **security is more important.**

Because on the other hand, this move will allow apps that can adopt Snow to **become truly secured against the same origin realms problem**. We can already see this approach being vital in protecting the [@MetaMask](https://metamask.io) app (which is the sole maintainer of Snow atm).

IMPORTANT NOTE: this does not mean websites and third party tools will fail to adopt Snow into them, it just means it MIGHT be potentially harder. This version for example works just fine on most major websites in the world.

> _**Thank you** [@agoric](https://github.com/agoric) for the inspiration with SES to think better about security ❤️._
