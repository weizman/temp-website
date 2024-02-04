---
enabled: true
layout: post
tags: Browser,Top,JavaScript,Research,Security,Supply-Chain-Security,The-Client-Side,Featured-on-X
title: Realms Security [𝕏]
url: https://weizman.github.io/
date: 19/11/2022
description: Let's understand realms security
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

<blockquote><p>Originally <a href="https://twitter.com/WeizmanGal/status/1593879906928074753">posted on X</a></p></blockquote>
<div id=container>
    Now that we understand:<br>
    <br>
    <span class="nop nop-start">1. </span> What realms in #javascript are;<br>
    <span class="nop nop-start">2. </span> Why they can so easily be maliciously utilized against #browser #javascript supply chain protections,<br>
    <br>
    🧵 We can finally talk about the security field that doesn't get the attention it deserves - realms #security:
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    But first, if you missed (1) what realms in javascript are, I recommend reading <a class="entity-url" data-preview="true" href="https://weizman.github.io/page-what-is-a-realm-in-js">What is a realm in JS?</a>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    And if you don't understand (2) why realms are such a security concern to in-browser supply chain security, I recommend going back to my previous tweet on that.<br>
    <br>
    All set? Let's begin👇🏻 <span class="entity-embed"><span class="twitter-player"><div class="twitter-tweet twitter-tweet-rendered" style="width: 100%; margin: 10px auto; display: flex; max-width: unset;"><iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 722px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=WeizmanGal&amp;dnt=true&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=true&amp;id=1576942106156810240&amp;lang=en&amp;origin=https%3A%2F%2Fthreadreaderapp.com%2Fthread%2F1593879906928074753.html&amp;sessionId=88de5f9695afcfece4e9563d37cae03636c5857f&amp;theme=light&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716&amp;width=550px" data-tweet-id="1576942106156810240"></iframe></div></span></span>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    Back in the days, when building web apps was not massively relying on a never ending list of dependencies, in-browser web apps builders were mostly concerned about XSS attacks for client side security.
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    Since those are syntax based type of vulnerabilities that are exploitable via user input, defending against those required developers to become aware of them, and make sure the code they’re deploying isn’t vulnerable to such attacks by properly sanitizing user input.
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    But since then things have changed dramatically, and user input is no longer the only exploitable surface for executing unwanted code in web apps.
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    Nowadays, the number one way of achieving that is by breaching dependencies that such web apps rely on - and it is far more complicated to defend against than user input sanitation.
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    It’s so complicated, that there is more than just one approach on how to do so, and a very popular one which is taken by various companies is by defending javascript in real time in the browser.
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    You get what I’m saying? Unlike XSS attacks, it is now so hard to prevent unwanted code execution due to supply chain attacks, that a popular solution is to just wait for it to happen and defend against it live!
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    In my previous thread I give a very straightforward explanation on how such solutions look like, but generally the idea is to redefine the behavior of javascript and by that protect it against potentially malicious usage (doesn't click? go back to this 👉🏻 )<span class="entity-embed"><span class="twitter-player"><div class="twitter-tweet twitter-tweet-rendered" style="width: 100%; margin: 10px auto; display: flex; max-width: unset;"><iframe id="twitter-widget-1" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 722px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=WeizmanGal&amp;dnt=true&amp;embedId=twitter-widget-1&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=true&amp;id=1576942106156810240&amp;lang=en&amp;origin=https%3A%2F%2Fthreadreaderapp.com%2Fthread%2F1593879906928074753.html&amp;sessionId=88de5f9695afcfece4e9563d37cae03636c5857f&amp;theme=light&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716&amp;width=550px" data-tweet-id="1576942106156810240"></iframe></div></span></span>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    But what I also talk about there, is how such defense when only applied to the main realm (top window) is basically useless, because any protection that is applied to only one realm does not apply automatically to another - and that's a part most solutions fail to protect against
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    To put simply, if for example my biggest fear is that an attacker successfully accesses “document.cookie” API so I delete access to it completely, I’m still screwed - the attacker can always regain that access by creating a new iframe and grabbing its unique “document.cookie” API
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    That is how good old realms in javascript can be maliciously abused due to how browser javascript attacks evolved.<br>
    <br>
    And that’s how the need for “realm security” was born - it’s the effort around securing realms so that attackers won’t be able to leverage them maliciously.
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    This is an abstract definition, because currently this is a very abstract concept - we only now start to understand the role of realms in the changing in-browser security ecosystem and that realms even require security due to how browser javascript security shapes up.
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    That is a security field I wish to define and further explore to eventually be able to improve the security of the web apps we use daily.<br>
    <br>
    Realms security is a field I have been researching for months now, and Snow JS ❄️ is the first significant fruit of my long term research.
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    Super excited to introduce Snow in the next thread 😊<br>
    <br>
    To follow my realms security research journey, best place would be
    <a href="https://github.com/weizman/awesome-javascript-realms-security">https://github.com/weizman/awesome-javascript-realms-security</a>
    where I cover everything there is to know about realms and {offensive/defensive} security of realms including best tools and practices<a class="entity-url" data-preview="true" href="https://github.com/weizman/awesome-javascript-realms-security" style="display: none;">github.com/weizman/awesom…</a>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
</div>
