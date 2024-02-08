---
enabled: true
layout: post
tags: Browser,Top,JavaScript,Research,Security,Supply-Chain-Security,The-Client-Side,MetaMask,LavaMoat,Featured-on-X
title: Introducing Snow ❄️ [𝕏]
url: https://weizman.github.io/
date: 04/01/2023
description: Introducing Snow JS, a JavaScript security tool for securing same origin realms as part of the MetaMask LavaMoat security toolbox
keywords: research, realms, security, iframe, window, JavaScript
image: realms.jpg

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

<blockquote><p>Originally <a href="https://twitter.com/WeizmanGal/status/1610728465363505152">posted on X</a></p></blockquote>
<div id=container>
    Excited to introduce the experimental ⚠️ #LavaMoat 🌋 toolbox technology,<br>
    <br>
    Snow JS ❄️<br>
    <br>
    <br>
    <br>
    🧵 Snow is an advanced and an important solution to a complicated sub problem in #browser #javascript #SupplyChainAttacks #security:<a class="entity-url" data-preview="true" href="Https://github.com/lavamoat/snow" style="display: none;">github.com/lavamoat/snow</a>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <div>
        <div class="entity-url-preview">
            <div class="d-flex justify-content-between align-items-center">
                <div class="border-right align-self-center">
                    <a target="_blank" href="Https://github.com/lavamoat/snow" class="img-cover">
                        <img src="https://repository-images.githubusercontent.com/497961481/ad5b0418-92c9-44b7-8072-5ef804d7a1b0" loading="lazy" onerror="this.src='/images/sticky-note-regular.png'">
                    </a>
                </div>
                <div class="flex-grow-1" style="min-width:0">
                    <div class="paragraph">
                        <a target="_blank" href="Https://github.com/lavamoat/snow">
                            <strong>GitHub - LavaMoat/snow: Use Snow to finally secure your web app's same origin realms!</strong>
                            Use Snow to finally secure your web app's same origin realms! - GitHub - LavaMoat/snow: Use Snow to finally secure your web app's same origin realms!
                        </a>
                        <a target="_blank" href="Https://github.com/lavamoat/snow"><small class="pre-url">Https://github.com/lavamoat/snow</small></a>
                    </div>
                </div>
            </div>
        </div>
    </div><hr>
    But first, get yourself familiar with the field of realms security by reading my previous tweet in order to understand the problem before we dive into the solution: <span class="entity-embed"><span class="twitter-player"><div class="twitter-tweet twitter-tweet-rendered" style="width: 100%; margin: 10px auto; display: flex; max-width: unset;"><iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 393px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=WeizmanGal&amp;dnt=true&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=true&amp;id=1593879906928074753&amp;lang=en&amp;origin=https%3A%2F%2Fthreadreaderapp.com%2Fthread%2F1610728465363505152.html&amp;sessionId=9989a63d13bea02f4b24e83f99f38543381d3467&amp;theme=light&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716&amp;width=550px" data-tweet-id="1593879906928074753"></iframe></div></span></span>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    So if to sum up the problem, we have many advanced browser JS security tools/services trying to apply protection to web apps by hooking into different browser builtin APIs with defense mechanisms that can be bypassed a good amount of the times by using same origin realms (iframe)
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    How so? If for example I create a tool that hooks into the "document.cookie" descriptor to block JS access to cookies for a made up security reason, malicious code can easily still access those cookies by creating an iframe and use the "document.cookie" descriptor from within it: <span class="entity-image"><a href="https://pbs.twimg.com/media/Flp1A2-aAAAZFWf.jpg" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/Flp1A2-aAAAZFWf.jpg" class=" b-loaded"></a></span>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    Why is this a problem? Because in the example above that's just one way to form a new same origin realm, but there are many other ways to do that. So if we wish to automatically defend all future realms we'd have to treat all possible ways to create them - attackers only need one
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    So obviously this is a hard problem to solve.<br>
    Automatically apply certain code not only to the top main realm, but to all potential child realms, immediately at the creation stage of a realm to prevent attackers from abusing them - is a hard need to accomplish.<br>
    <br>
    Enters SnowJS ❄️
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    Snow attempts to accomplish just that!<br>
    <br>
    It provides a simple API that when given a callback invokes it with every newborn realm in the web app.<br>
    <br>
    Meaning, it allows you to synchronously hook into the rising moment of every new realm in the web app and manipulate it as you wish. <span class="entity-image"><a href="https://pbs.twimg.com/media/Flp1BxwaYAAfuG3.jpg" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/Flp1BxwaYAAfuG3.jpg" class=" b-loaded"></a></span>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    In contrast to how simple Snow’s API is, it does a lot of complicated work in making sure creation of new realms cannot be accomplished without going through Snow first.
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    By putting security first, Snow does its best at:<br>
    <span class="nop nop-start">1. </span> Hooking every possible way of creating new realms;<br>
    <span class="nop nop-start">2. </span> Getting a hold on new realms before any other JS code in runtime has the chance to.
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    To put simply, this means Snow does a hard work in preventing anyone from creating new iframes and accessing their new window object before Snow does.<br>
    <br>
    Now that we understand what Snow is, it’s clear how we can use it to solve the sub problem that’s described in the thread above:
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    Basically we can take any protection tool/service out there and instead of running it on the top main realm only, use Snow to apply itself to all potential newborn child realms - as simple as that!<br>
    <br>
    Same goes for our "cookie protector" example from before: <span class="entity-image"><a href="https://pbs.twimg.com/media/Flp1CzNagAAn-Lk.jpg" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/Flp1CzNagAAn-Lk.jpg" class=" b-loaded"></a></span>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    I made sure there is a massive amount of information about Snow, so if you want to learn more about the project, the motivation behind it, the problem it tries to solve and more, it's all documented and continently updated here: so give it a look!<a class="entity-url" data-preview="true" href="https://github.com/weizman/awesome-javascript-realms-security#tools" style="display: none;">github.com/weizman/awesom…</a>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <div>
        <div class="entity-url-preview">
            <div class="d-flex justify-content-between align-items-center">
                <div class="border-right align-self-center">
                    <a target="_blank" href="https://github.com/weizman/awesome-javascript-realms-security#tools" class="img-cover">
                        <img src="https://opengraph.githubassets.com/e7c5677bf91cc0462a8a4e3d76f9873acb1e413ee3e48fc530938cd8c4184f6d/weizman/awesome-javascript-realms-security" loading="lazy" onerror="this.src='/images/sticky-note-regular.png'">
                    </a>
                </div>
                <div class="flex-grow-1" style="min-width:0">
                    <div class="paragraph">
                        <a target="_blank" href="https://github.com/weizman/awesome-javascript-realms-security#tools">
                            <strong>GitHub - weizman/awesome-javascript-realms-security: javascript realms security resources</strong>
                            javascript realms security resources. Contribute to weizman/awesome-javascript-realms-security development by creating an account on GitHub.
                        </a>
                        <a target="_blank" href="https://github.com/weizman/awesome-javascript-realms-security#tools"><small class="pre-url">https://github.com/weizman/awesome-javascript-realms-security#tools</small></a>
                    </div>
                </div>
            </div>
        </div>
    </div><hr>
    I will continue to talk about Snow and attempt to further explain it down the road, to make sure you're as excited about it as I am if you're not convinced yet 😉<br>
    <br>
    Remember: Snow is still experimental ⚠️ and might still not be bulletproof as this is a very hard problem to solve!
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
</div>
