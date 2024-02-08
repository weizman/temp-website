---
enabled: true
layout: post
tags: Top,Security,JavaScript,Research,The-Client-Side,Browser,Featured-on-X
title: Proto Tree 🌳 - A Way to Observe the JS Prototype Chain [𝕏]
url: https://weizman.github.io/
date: 27/07/2023
description: The JavaScript prototype chain is complicated and hard to study, so shouldn't there be an online tool for that already?
keywords: browser, security, javascript, research, prototype, chain
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

<blockquote><p>Originally <a href="https://twitter.com/WeizmanGal/status/1684608574444785664">posted on X</a></p></blockquote>
<div id=container>
    You always hear about the prototype chain in #JavaScript, but why isn't there a way to actually see and play with it?<br>
    <br>
    Well, now there is!<br>
    <br>
    Here's ProtoTree 🌳 - a fun little app you can use any time to both generate and observe the prototype chain live in the browser as a tree: <span class="entity-image"><a href="https://pbs.twimg.com/media/F2DukYLacAAPlgH.jpg" target="_blank"><img alt="A screenshot of the ProtoTree app in action" src="https://pbs.twimg.com/media/F2DukYLacAAPlgH.jpg" class=" b-loaded"></a></span>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    <br>
    <br>
    Motivation: As a browser security researcher, I always found it weird there isn't a tool (AFAIK) to help you better understand the proto-chain.<br>
    <br>
    An app you can play with and use to see how everything connects.<br>
    <br>
    It can be useful for a number of reasons:<a class="entity-url" data-preview="true" href="https://weizmangal.com/ProtoTree/?filters=XMLHttpRequest" style="display: none;">weizmangal.com/ProtoTree/?fil…</a>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <div>
        <div class="entity-url-preview">
            <div class="d-flex justify-content-between align-items-center">
                <div class="border-right align-self-center">
                    <a target="_blank" href="https://weizmangal.com/ProtoTree/?filters=XMLHttpRequest" class="img-cover">
                        <img src="https://weizman.github.io/ProtoTree/img.jpg" loading="lazy" onerror="this.src='/images/sticky-note-regular.png'">
                    </a>
                </div>
                <div class="flex-grow-1" style="min-width:0">
                    <div class="paragraph">
                        <a target="_blank" href="https://weizmangal.com/ProtoTree/?filters=XMLHttpRequest">
                            <strong>ProtoTree - the javascript prototype chain as a tree</strong>
                            Observe the javascript prototype chain as an interactive tree in the browser
                        </a>
                        <a target="_blank" href="https://weizmangal.com/ProtoTree/?filters=XMLHttpRequest">
                            <small class="pre-url">https://weizmangal.com/ProtoTree/?filters=XMLHttpRequest</small>
                        </a>
                    </div></div></div></div></div><hr>
    <span class="nop nop-start">1. </span> Learning!<br>
    <br>
    * Who're the ancestors of HTMLBodyElement? <br>
    <a class="entity-url" data-preview="true" href="https://weizmangal.com/ProtoTree/?filters=HTMLBodyElement">weizmangal.com/ProtoTree/?filters=HTMLBodyElement</a><br>
    <br>
    * What are all the error types your browser supports? <br>
    <a class="entity-url" data-preview="true" href="https://weizmangal.com/ProtoTree/?filters=error">weizmangal.com/ProtoTree/?filters=error</a><br>
    <br>
    * What are all the SVG interfaces your browser supports? <br>
    <a class="entity-url" data-preview="true" href="https://weizmangal.com/ProtoTree/?filters=SVG">weizmangal.com/ProtoTree/?filters=SVG</a><br>
    <br>
    This goes as far as you want it to!
    <span class="entity-image"><a href="https://pbs.twimg.com/media/F2Duk90bcAAJ9UW.jpg" target="_blank"><img alt="The result of running ProtoTree in Chrome and filtering by &quot;HTMLBodyElement&quot;" src="https://pbs.twimg.com/media/F2Duk90bcAAJ9UW.jpg" class=" b-loaded"></a></span>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    <span class="nop nop-start">2. </span> Research!<br>
    <br>
    Being able to generate this information can be useful to arrive at more insightful conclusions:<br>
    <br>
    * More powerful and accurate feature detection - since ProtoTree walks through EVERYTHING, the tree it outputs is consistent on one hand, but is also sensitive to the...
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    ... slightest modifications to the runtime env on the other hand.<br>
    <br>
    Meaning, the most delicate diffs between envs will affect the result outputted by ProtoTree.<br>
    <br>
    Therefore, it'll differ among different OSes, browsers, devices - even extensions!<br>
    <br>
    Anyone thinking of finger printing? <span class="entity-image"><a href="https://pbs.twimg.com/media/F2Dulj4asAAImJB.jpg" target="_blank"><img alt="A JSON diff between the result of running ProtoTree on Chrome and Firefox (using &quot;error&quot; as filter)" src="https://pbs.twimg.com/media/F2Dulj4asAAImJB.jpg" class=" b-loaded"></a></span>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    Whereas the logic behind the app isn't suited for consuming as API (help is welcome!), it currently offers to:<br>
    <br>
    * Filter the tree by text<br>
    * Jump to key prototypes in the generated chain<br>
    * Copy the output tree as JSON<br>
    * Observe own properties of each prototype in the chain<br>
    <br>
    Also,
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    By opening the devtools, you can investigate the output further by:<br>
    <br>
    * Observing the live values in the tree<br>
    * Observing the entire tree as a JSON object<br>
    * Observing the filtered tree as a JSON object<br>
    <br>
    Without getting into too much detail, here's how ProtoTree works: <span class="entity-image"><a href="https://pbs.twimg.com/media/F2DumPVbsAAkTyA.jpg" target="_blank"><img alt="Showing the extra tools ProtoTree logs to the devtools console for further investigation of the prototype chain tree" src="https://pbs.twimg.com/media/F2DumPVbsAAkTyA.jpg" class=" b-loaded"></a></span>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    For the generation to remain as pure as possible, it runs in a cross origin "data:" iframe so that scripts polluting the top realm env won't get in the way.<br>
    <a class="entity-url" data-preview="true" href="https://github.com/lavamoat/lavatube/" style="display: none;">LavaTube</a>
    <br>
    The tree construction is done thanks to LavaTube - a security research tool developed <a href="https://x.com/@MetaMask">@MetaMask</a>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    You're welcome to visit (and ⭐!) the source code <a target="_blank" href="https://github.com/weizman/ProtoTree"><small class="pre-url">https://github.com/weizman/ProtoTree</small></a>, be warned that no effort was put into the codebase being well designed and architectured - this is an experimental tool!<br>
    <br>
    Also, the widest the filter is, the longer it'll take the browser to form the tree!<a class="entity-url" data-preview="true" href="https://github.com/weizman/ProtoTree" style="display: none;">github.com/weizman/ProtoT…</a>
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
    <hr>
    I hope you find this interesting and/or useful!<br>
    <br>
    If this inspires you or gives you any ideas of how ProtoTree can be used, I'd love to hear it!<br>
    <br>
    ProtoTree is served freely on <a href="https://x.com/@GitHub">@GitHub</a> Pages and is MIT licensed for your education, free use, etc.<br>
    <br>
    Made with love for the community ❤️
    <sup class="tw-permalink"><i class="fas fa-link"></i></sup>
</div>
