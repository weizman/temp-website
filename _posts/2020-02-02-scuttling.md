---
enabled: true
layout: post
tags: Top,Security,JavaScript,Research,Supply-Chain-Security,The-Client-Side,Browser,MetaMask,LavaMoat,Web3
title: MetaMask JavaScript Security Stack (Part 1 - scuttling)
url: https://weizman.github.io/
date: 30/06/2023
description: A series exploring the JavaScript security stack of the MetaMask browser wallet (part 1 - LavaMoat scuttling)
keywords: metamask, lavamoat, snow, browser, security, extensions, javascript, iframe, xss, supply chain, research, keylogging, csp, scuttling
---

<style>
        .post {
            max-width: 80vh;
        }
        IMG {
            border: solid 1px lightgray;
            padding: 15px;
            margin: 15px;
        }
    </style>

<blockquote><p>Originally <a href="https://twitter.com/WeizmanGal/status/1674751159003914240">posted on X</a></p></blockquote>
        
<div id=container>
    

MetaMask 🦊 is an amazing app for many reasons.<br>
<br>
One reason I like especially is that even though it works just fine, the window object of the app is (almost) unusable!<br>
<br>
If you're into Browser JavaScript security, come learn about what we call "scuttling" - by LavaMoat 🌋<br>
<br>
Well.. <span class="entity-image"><a href="https://pbs.twimg.com/media/Fz3pTDwaUAcTwYK.jpg" target="_blank"><img src="https://pbs.twimg.com/media/Fz3pTDwaUAcTwYK.jpg" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
.. naturally, MetaMask 🦊 runs on top of a complex graph of dependencies.<br>
<br>
Therefore, we're quite scared about supply chain attacks (you should too btw).<br>
<br>
So scared that we build and run the app under a homemade tool we call LavaMoat 🌋.<br>
<br>
By running on top of SES by <a href="https://x.com/@agoric">@agoric</a>,
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
LavaMoat creates a dedicated sandbox for each dependency.<br>
<br>
Furthermore, it makes sure each sandboxed dep gets access only to the features it actually needs.<br>
<br>
So for example, if dep "axios" needs access to "window.fetch", LavaMoat will make sure it gets that access.<br>
<br>
But if.. <span class="entity-image"><a href="https://pbs.twimg.com/media/Fz3pT7maUAAgw6o.jpg" target="_blank"><img src="https://pbs.twimg.com/media/Fz3pT7maUAAgw6o.jpg" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
.. "axios" gets an update where it tries to access "document.cookie" all of the sudden, its dedicated LavaMoat sandbox won't allow it, thus preventing the dep from accessing features it isn't supposed to have access to.<br>
<br>
Pretty neat right?<br>
<br>
<a class="entity-url" data-preview="true" href="https://github.com/LavaMoat/LavaMoat#how-lavamoat-works" style="display: none;">github.com/LavaMoat/LavaMoat</a>
<br>
However,
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<div>
</div><hr>
What if a dep manages to use the APIs allowed by LavaMoat to escape the sandbox?<br>
<br>
In that case, the dep can climb up to the real global object of the app (the window) where it can find all the APIs LavaMoat tried to deny it from!<br>
<br>
Effectively, (almost) canceling LavaMoat's goal! <span class="entity-image"><a href="https://pbs.twimg.com/media/Fz3pUyUaIAAoWp_.png" target="_blank"><img src="https://pbs.twimg.com/media/Fz3pUyUaIAAoWp_.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
Luckily, we like to prepare for such edge cases in MetaMask ⚔️<br>
<br>
The beauty about the “sandboxes” LavaMoat uses (called Compartments - implemented in SES by <a href="https://x.com/@agoric">@agoric</a>) is that the instances of the APIs they provide are not the same instances originally coming from the global object.
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
So if the entire dep-graph and the app itself all live in their own separate sandboxes with their own sets of APIs - this means the original APIs that came from the original global object are unused.<br>
<br>
If so, why not remove them then?<br>
<br>
In fact, it'll even make the app more secure!
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
That way, code escaping the sandbox won't be able to grab APIs it isn't allowed to!<br>
<br>
So if a dep we don't trust is allowed to access "fetch", and somehow managed to escape its Compartment (/sandbox) and climb up to the window object, it'll expose much more APIs than just "fetch".
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
But if we remove those APIs from the window object, escaping the sandbox will no longer be enough to reach other APIs, and the dep will remain stuck with only "fetch"!<br>
<br>
This is how you reach a wacky state where your app works just fine, but the real window object's dead inside 🥲 <span class="entity-image"><a href="https://pbs.twimg.com/media/Fz3pVyjagAAlegz.png" target="_blank"><img src="https://pbs.twimg.com/media/Fz3pVyjagAAlegz.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
We call the removal of the APIs and properties of the global object "scuttling" (coined by <a href="https://x.com/@kumavis_">@kumavis_</a>), and it actually works!<br>
<br>
... in theory.<br>
<br>
In reality, it's not so simple - we still skip scuttling of some specific properties.<br>
<br>
But I will elaborate on that in the next thread 😉
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
In the meantime, some resources:<br>
<br>
* Original <a href="https://github.com/LavaMoat/LavaMoat/pull/360">PR</a> introducing scuttling to LavaMoat <br>
<br>
* <a href="https://github.com/MetaMask/metamask-extension/pull/17276/files#diff-d2cbf252783e5836a01b2eb1f9604a8452edc4eb3891baa61d1df758bdc501a1">List</a> of properties we DON'T scuttle at the moment (which I'll talk about in the next thread)<br>
<br>
* <a href="https://github.com/endojs/endo/blob/master/packages/ses/README.md#compartment">SES Compartments</a> by <a href="https://x.com/@agoric">@agoric</a>
</div>
