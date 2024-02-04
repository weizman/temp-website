---
enabled: true
layout: post
tags: Top,Vulnerabilities,Security,JavaScript,Research,Supply-Chain-Security,The-Client-Side,Browser,MetaMask,LavaMoat,Web3
title: MetaMask Wallet Security Threat Model - The Browser's Prespective
url: https://weizman.github.io/
date: 21/01/2024
description: Debunking a recently published academic paper on browser wallets security proving browser wallets like MetaMask are in fact secure
keywords: metamask, lavamoat, snow, browser, security, extensions, javascript, iframe, xss, supply chain, research, keylogging, csp
---

> Originally [posted on X](https://twitter.com/WeizmanGal/status/1747675790668685728)

<div id=container>
    <style>
        .post {
            max-width: 50vh;
        }
        IMG {
            border: solid 1px lightgray;
            padding: 15px;
            margin: 15px;
        }
    </style>

A recently published paper on Browser Wallets Security was just shared.<br>
<br>
Given this being my field of work in recent years, I make sure to familiarize myself with such content.<br>
<br>
I'll address the claims it makes, how <a href="https://x.com/@metamask">@metamask</a>🦊 is secured from them and why the rest aren't valid🧵 <span class="entity-embed"><span class="twitter-player"><div class="twitter-tweet twitter-tweet-rendered" style="width: 100%; margin: 10px auto; display: flex; max-width: unset;"><iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 825px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=WeizmanGal&amp;dnt=true&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=true&amp;id=1746804037104619910&amp;lang=en&amp;origin=https%3A%2F%2Fthreadreaderapp.com%2Fthread%2F1747675800558780786.html&amp;sessionId=0a5fdd96ce7e65aa6e95ebe3373c61b6d524758a&amp;theme=light&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716&amp;width=550px" data-tweet-id="1746804037104619910"></iframe></div></span></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
[B=Browser/H=Hardware/W=Wallet]<br>
<br>
Its main claim is that HWs are secured whereas BWs aren't simply because the former never exposes the private key outside the hardware whereas the latter stores it in more vulnerable infrastructures being the browser &amp; OS.<br>
<br>
While somewhat true... <span class="entity-image"><a href="https://pbs.twimg.com/media/GED94MWbYAM-MJb.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED94MWbYAM-MJb.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
... HWs and BWs aren't strictly opposites, but can be complimentary - whether storing their private key in MetaMask or using it strictly for bridging actual HWs such as <a href="https://x.com/@Ledger">@Ledger</a> or <a href="https://x.com/@Trezor">@Trezor</a> is for the user to decide.<br>
<br>
Other way around's also true - for HWs to interact with dapps...
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
... they NEED some software bridging, whether built by them (e.g. Ledger Extension) or served by BWs (e.g. Ledger/Trezor on MetaMask).<br>
<br>
This point is crucial to understand in this context.<br>
<br>
Not mentioning it when claiming BWs to be objectively "poorly secured" is misleading IMO.
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
On to the part I want to focus on - Browser Security.<br>
<br>
Under this section the paper refers to different threats BWs face:<br>
<br>
* Browser extensions (Phishing/UI manipulation , Keylogging/Screenshotting)<br>
* XSS<br>
* Malware (OS)<br>
* Browser Insecurity<br>
* Developer Libraries<br>
<br>
Let's begin: <span class="entity-image"><a href="https://pbs.twimg.com/media/GED95DubYAEgI5l.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED95DubYAEgI5l.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
~~~<br>
Both Section 3 and 4 discuss "Literature Review" and "Vulnerabilities in BW Applications" (respectively) in regards to all five points described above that we're about to dive into, so for each point I will be referring to its literature and/or practical reviews.<br>
~~~ <span class="entity-image"><a href="https://pbs.twimg.com/media/GED95hRaIAA0ngW.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED95hRaIAA0ngW.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
Starting with the easiest to disprove - Browser Extensions.<br>
<br>
One part of this claim is that if the victim mistakenly installs a malicious extension - in addition to the legitimate MetaMask one - it can steal their private key by either sniffing their key strokes... <span class="entity-image"><a href="https://pbs.twimg.com/media/GED95_EbYAEfJfe.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED95_EbYAEfJfe.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
... hoping they catch SRP insertion or capturing screenshots of the extension hoping they ask the BW to display the SRP.<br>
<br>
Let me be clear here - this ISN'T possible.<br>
<br>
While an extension can capture screenshots / sniff key strokes (with the right permissions), it can only do so...
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
... to websites - not other extensions.<br>
<br>
Evil extensions can gain such access to websites, because as part of browsers threat model - extensions have power over them.<br>
<br>
But according to that same model, extensions DO NOT have that kind of power over other extensions (obviously).
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
The other part of this claim talks about how such extensions can manipulate the UI the user interacts with to set them up to perform unwanted actions.<br>
<br>
While very true, this claim is in fact pro BW over HW and not the other way around.<br>
<br>
When interacting with dApps... <span class="entity-image"><a href="https://pbs.twimg.com/media/GED964cbYAA_ycU.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED964cbYAA_ycU.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
... that were either maliciously manipulated by an evil extension or by themselves are malicious - tricking the user to approve and sign a bad tx has nothing to do with whether the wallet is a BW or a HW.<br>
<br>
But security advanced BWs (such as MetaMask) can at least do a good job...
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
... at letting you know if the tx you're about to sign might be malicious (see quote) - a feature HWs do not provide.<br>
<br>
This claim would have been valid if the wallets were compared strictly for storing purposes rather than dApps interaction - but that's clearly not the case here. <span class="entity-embed"><span class="twitter-player"><div class="twitter-tweet twitter-tweet-rendered" style="width: 100%; margin: 10px auto; display: flex; max-width: unset;"><iframe id="twitter-widget-1" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 713px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=WeizmanGal&amp;dnt=true&amp;embedId=twitter-widget-1&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=true&amp;id=1719399787420655900&amp;lang=en&amp;origin=https%3A%2F%2Fthreadreaderapp.com%2Fthread%2F1747675800558780786.html&amp;sessionId=0a5fdd96ce7e65aa6e95ebe3373c61b6d524758a&amp;theme=light&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716&amp;width=550px" data-tweet-id="1719399787420655900"></iframe></div></span></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
Next is XSS.<br>
<br>
This one's more valid for sure, but it's important to clarify that XSS in a dApp cannot transform to SRP theft nor any damage at all (without user interaction) unlike brought up in the paper with this OpenSea example below.<br>
<br>
However, XSS in the BW itself... <span class="entity-image"><a href="https://pbs.twimg.com/media/GED-GrYWMAE7nNT.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED-GrYWMAE7nNT.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
... can lead to SRP theft, but only if:<br>
<br>
* User asks to export/display/access the SRP/private key which exposes it to the BW UI process;<br>
/OR/<br>
* User types their BW password.<br>
<br>
While theoretically true, XSS attacks are more rare for a reason - browsers nowadays provide the tech...
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
... needed to prevent XSS, and if used right allows apps such as a BW to defend themselves properly from such an attack.<br>
<br>
Combined with self custodial BWs naturally smaller XSS attack surface to begin with (no server + not much externally accepted input) - XSS becomes unlikely.
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
And with MetaMask's strong anti code-execution CSP rules - we make it even less likely.<br>
<br>
Bottom line, I accept BWs being less likely to prevent SRP/PK theft than HWs due to XSS, but it's far closer to impossible than possible.<br>
<br>
BUT to take it even ANOTHER step further...
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
... even if such evil code execution is obtained, and [as stated in the attached image] "the SRP is left accessible to scripts and thus vulnerable to XSS" - we still have ANOTHER security layer for isolating sensitive parts of the DOM (like SRP).<br>
<br>
For more on that - stay tuned 😉 <span class="entity-image"><a href="https://pbs.twimg.com/media/GED-QnDWsAAy9Ud.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED-QnDWsAAy9Ud.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
Next comes Malware.<br>
<br>
Most valid point in this paper IMO.<br>
<br>
OS level malware is something BWs will always have a hard time defending against, because BWs are hosted in an environment with higher privileges that they must blindly trust, and in that context HWs have an advantage, <span class="entity-image"><a href="https://pbs.twimg.com/media/GED-U_IWgAAqF1P.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED-U_IWgAAqF1P.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
because they ARE that environment - starting from the software all the way to the hardware.<br>
<br>
So again - for storing strictly? HWs are great.<br>
<br>
But for most of the times, interactivity (with dApps) is needed, and at that point a malware can target HWs similarly to BWs (see reply👇)
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
Afterwards there's Browser Insecurity.<br>
<br>
"safe to say, securing the browser enough to eliminate the risk of sensitive data being stolen is unrealistic".<br>
<br>
Disagree. Browsers are safe.<br>
<br>
Browsers ARE a "trustworthy platform for applications or sensitive data" and have been for years, <span class="entity-image"><a href="https://pbs.twimg.com/media/GED-iN4WUAEOqKF.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED-iN4WUAEOqKF.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
they just need to be used right. Also, the context matters a lot:<br>
<br>
With self custodial wallets, a server can't be used for storing "sensitive data".<br>
<br>
So in that context, storing SRP/PK in a HW instead of the browser is agreed to be better, but again - to interact with dApps...
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
... HWs need to bridge through a browser anyway.<br>
<br>
Therefore, a big part of the threats described in the paper are similarly riskful.<br>
<br>
Now, as for the last one, and our personal favorite in MetaMask: "Developer Libraries".<br>
<br>
Or as we like to call it: "Supply Chain Security". <span class="entity-image"><a href="https://pbs.twimg.com/media/GED-nAHXkAAGjs7.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED-nAHXkAAGjs7.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
Being the maintainers of LavaMoat, we at MetaMask could not agree more with the sentiment of supply chain attacks being a major threat to BWs.<br>
<br>
But when referring to MetaMask's security in context of "developers libraries", as was done in the paper, LavaMoat must not be left out.
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
Exploiting a supply chain breach to fully compromise the SRP of MetaMask is far from easy, thanks to the hard work and effort put into securing against such attacks in our BW.<br>
<br>
That’s what the LavaMoat project is all about, as it covers multiple aspects of the following question:
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
If untrusted code (whether by XSS or a supply chain breach) runs inside the BW - how well is it mitigated by the BW runtime?<br>
<br>
Not to speak for other wallets, but for MetaMask the answer would be “very well”.<br>
<br>
Learn more about the LavaMoat stack that’s making this possible:
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
* LavaMoat <br>
    <div>
        <a target="_blank" href="https://metamask.io/news/security/using-lavamoat-to-solve-software-supply-chain-security/">
            <strong>Using LavaMoat To Solve Software Supply Chain Security | MetaMask News</strong>
            LavaMoat is a set of security tools for any JavaScript app to mitigate software supply risks.
        </a>
    </div>
<br>
* Scuttling <br>
    <span class="entity-embed"><span class="twitter-player"><div class="twitter-tweet twitter-tweet-rendered" style="width: 100%; margin: 10px auto; display: flex; max-width: unset;"><iframe id="twitter-widget-2" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 715px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=WeizmanGal&amp;dnt=true&amp;embedId=twitter-widget-2&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=true&amp;id=1674751159003914240&amp;lang=en&amp;origin=https%3A%2F%2Fthreadreaderapp.com%2Fthread%2F1747675800558780786.html&amp;sessionId=0a5fdd96ce7e65aa6e95ebe3373c61b6d524758a&amp;theme=light&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716&amp;width=550px" data-tweet-id="1674751159003914240"></iframe></div></span></span><br>
<br>
* Snow <br>
    <span class="entity-embed"><span class="twitter-player"><div class="twitter-tweet twitter-tweet-rendered" style="width: 100%; margin: 10px auto; display: flex; max-width: unset;"><iframe id="twitter-widget-3" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 667px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=WeizmanGal&amp;dnt=true&amp;embedId=twitter-widget-3&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=true&amp;id=1679873336510402561&amp;lang=en&amp;origin=https%3A%2F%2Fthreadreaderapp.com%2Fthread%2F1747675800558780786.html&amp;sessionId=0a5fdd96ce7e65aa6e95ebe3373c61b6d524758a&amp;theme=light&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716&amp;width=550px" data-tweet-id="1679873336510402561"></iframe></div></span></span>
<br>
* LavaDome (soon, stay tuned 😉)
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
As for the rest of the paper (sections 5, 6 and 7):<br>
<br>
After covering the different threats, it continues to discuss leads for further research, conclusions and comparisons to HWs - all based on the former (not very rightfully concluded) described threats in sections 3 and 4. <span class="entity-image"><a href="https://pbs.twimg.com/media/GED-071XcAA6Oi7.png" target="_blank"><img alt="Image" src="https://pbs.twimg.com/media/GED-071XcAA6Oi7.png" class=" b-loaded"></a></span>
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
Key takeaways:<br>
<br>
* For strictly storing self custodial SRP/PK - HWs are safer.<br>
<br>
* (But not for the reasons shared in the paper though).<br>
<br>
* To use these to interact with dApps, a browser must be introduced into the flow.
<sup class="tw-permalink"><i class="fas fa-link"></i></sup>
<hr>
* It’s not necessarily one or the other - BWs can be integrated with HWs for maximum security and interactivity.<br>
<br>
* Need a trustworthy, self custodial BW that integrates with HWs and puts security first?<br>
<br>
Choose MetaMask 🦊<br>
<br>
~ Thank you <a href="https://x.com/@danfinlay">@danfinlay</a> for introducing me to this paper
</div>
