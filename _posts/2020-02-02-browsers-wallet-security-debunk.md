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

A recently published paper on Browser Wallets Security was just shared.

Given this being my field of work in recent years, I make sure to familiarize myself with such content.

I'll address the claims it makes, how [@metamask](https://metamask.io/) 🦊 is secured from them and why the rest aren't valid🧵

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Private Key Vulnerabilities in Browser Wallets - Master Thesis by Jaakko Pentinsaari<a href="https://t.co/jRNSxhoktm">https://t.co/jRNSxhoktm</a> <a href="https://t.co/mye557ZnK7">pic.twitter.com/mye557ZnK7</a></p>&mdash; Mikko Ohtamaa (@moo9000) <a href="https://twitter.com/moo9000/status/1746804037104619910?ref_src=twsrc%5Etfw">January 15, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

[B=Browser/H=Hardware/W=Wallet]

![image](https://github.com/weizman/weizman.github.io/assets/13243797/b2a9111a-208e-45cb-a444-41ca8fbe709d)


Its main claim is that HWs are secured whereas BWs aren't simply because the former never exposes the private key outside the hardware whereas the latter stores it in more vulnerable infrastructures being the browser & OS.

While somewhat true HWs and BWs aren't strictly opposites, but can be complimentary - whether storing their private key in MetaMask or using it strictly for bridging actual HWs such as [@Ledger](https://www.ledger.com/) or [@Trezor](https://trezor.io/) is for the user to decide.

Other way around's also true - for HWs to interact with dapps they NEED some software bridging, whether built by them (e.g. Ledger Extension) or served by BWs (e.g. Ledger/Trezor on MetaMask).

This point is crucial to understand in this context.

Not mentioning it when claiming BWs to be objectively "poorly secured" is misleading IMO.

On to the part I want to focus on - Browser Security.

Under this section the paper refers to different threats BWs face:

* Browser extensions (Phishing/UI manipulation , Keylogging/Screenshotting)
* XSS
* Malware (OS)
* Browser Insecurity
* Developer Libraries

![image](https://github.com/weizman/weizman.github.io/assets/13243797/6cd23116-8e0b-4257-b19f-83b09b27233c)


Let's begin:

~~~
Both Section 3 and 4 discuss "Literature Review" and "Vulnerabilities in BW Applications" (respectively) in regards to all five points described above that we're about to dive into, so for each point I will be referring to its literature and/or practical reviews.
~~~

![image](https://github.com/weizman/weizman.github.io/assets/13243797/ada773d4-cc17-49d1-8b03-7c1fd3c70542)


Starting with the easiest to disprove - Browser Extensions:

![image](https://github.com/weizman/weizman.github.io/assets/13243797/42e25fb9-7130-489e-a8cc-109ab6a4d173)


One part of this claim is that if the victim mistakenly installs a malicious extension - in addition to the legitimate MetaMask one - it can steal their private key by either sniffing their key strokes hoping they catch SRP insertion or capturing screenshots of the extension hoping they ask the BW to display the SRP.

Let me be clear here - this ISN'T possible.

While an extension can capture screenshots / sniff key strokes (with the right permissions), it can only do so to websites - not other extensions.

Evil extensions can gain such access to websites, because as part of browsers threat model - extensions have power over them.

But according to that same model, extensions DO NOT have that kind of power over other extensions (obviously).

The other part of this claim talks about how such extensions can manipulate the UI the user interacts with to set them up to perform unwanted actions:

![image](https://github.com/weizman/weizman.github.io/assets/13243797/924e2e7f-3c3c-41a4-9a6b-084421c8c44c)


While very true, this claim is in fact pro BW over HW and not the other way around.

When interacting with dApps that were either maliciously manipulated by an evil extension or by themselves are malicious - tricking the user to approve and sign a bad tx has nothing to do with whether the wallet is a BW or a HW.

But security advanced BWs (such as MetaMask) can at least do a good job at letting you know if the tx you're about to sign might be malicious (see quote) - a feature HWs do not provide.

This claim would have been valid if the wallets were compared strictly for storing purposes rather than dApps interaction - but that's clearly not the case here.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">In collaboration with <a href="https://twitter.com/blockaid_?ref_src=twsrc%5Etfw">@Blockaid_</a>, a leading web3 security provider, we are pleased to announce the launch of privacy-preserving security alerts in the MetaMask extension to help stop malicious transactions before they happen.🦊🛡️<br> <a href="https://t.co/G7tu8eeyyt">https://t.co/G7tu8eeyyt</a></p>&mdash; MetaMask 🦊🫰 (@MetaMask) <a href="https://twitter.com/MetaMask/status/1719399787420655900?ref_src=twsrc%5Etfw">October 31, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Next is XSS.

This one's more valid for sure, but it's important to clarify that XSS in a dApp cannot transform to SRP theft nor any damage at all (without user interaction) unlike brought up in the paper with this OpenSea example below:

![image](https://github.com/weizman/weizman.github.io/assets/13243797/67512abe-6ccb-4da5-a2f7-16837b0aa4a7)


However, XSS in the BW itself can lead to SRP theft, but only if:

* User asks to export/display/access the SRP/private key which exposes it to the BW UI process;
/OR/
* User types their BW password.

While theoretically true, XSS attacks are more rare for a reason - browsers nowadays provide the tech needed to prevent XSS, and if used right allows apps such as a BW to defend themselves properly from such an attack.

Combined with self custodial BWs naturally smaller XSS attack surface to begin with (no server + not much externally accepted input) - XSS becomes unlikely.

And with MetaMask's strong anti code-execution CSP rules - we make it even less likely.

Bottom line, I accept BWs being less likely to prevent SRP/PK theft than HWs due to XSS, but it's far closer to impossible than possible.

BUT to take it even ANOTHER step further even if such evil code execution is obtained, and [as stated in the attached image] "the SRP is left accessible to scripts and thus vulnerable to XSS" - we still have ANOTHER security layer for isolating sensitive parts of the DOM (like SRP).

For more on that - stay tuned 😉

![image](https://github.com/weizman/weizman.github.io/assets/13243797/2d571e30-48d4-43dc-80fe-4ca4757c7027)

Next comes Malware (most valid point in this paper IMO):

![image](https://github.com/weizman/weizman.github.io/assets/13243797/93795a14-2c3c-4318-afbe-a777bb8f4237)


OS level malware is something BWs will always have a hard time defending against, because BWs are hosted in an environment with higher privileges that they must blindly trust, and in that context HWs have an advantage, because they ARE that environment - starting from the software all the way to the hardware.

So again - for storing strictly? HWs are great.

But for most of the times, interactivity (with dApps) is needed, and at that point a malware can target HWs similarly to BWs:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">At 9:40am this morning <a href="https://twitter.com/HughKarp?ref_src=twsrc%5Etfw">@HughKarp</a>&#39;s personal address was attacked and drained by a member of the mutual. Only Hugh’s address was affected in this targeted attack and there is no subsequent risk to Nexus Mutual or any members.<a href="https://t.co/72nrIDpKW6">https://t.co/72nrIDpKW6</a></p>&mdash; Nexus Mutual (@NexusMutual) <a href="https://twitter.com/NexusMutual/status/1338441873560571906?ref_src=twsrc%5Etfw">December 14, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Afterwards there's Browser Insecurity:

![image](https://github.com/weizman/weizman.github.io/assets/13243797/a4dd0740-278b-40c1-b801-110bad8ffbe7)


"safe to say, securing the browser enough to eliminate the risk of sensitive data being stolen is unrealistic".

Disagree. Browsers are safe.

Browsers ARE a "trustworthy platform for applications or sensitive data" and have been for years, they just need to be used right. Also, the context matters a lot:

With self custodial wallets, a server can't be used for storing "sensitive data".

So in that context, storing SRP/PK in a HW instead of the browser is agreed to be better, but again - to interact with dApps, HWs need to bridge through a browser anyway.

Therefore, a big part of the threats described in the paper are similarly riskful.

Now, as for the last one, and our personal favorite in MetaMask: "Developer Libraries".

Or as we like to call it: "Supply Chain Security":

![image](https://github.com/weizman/weizman.github.io/assets/13243797/ef8d4918-383d-44c4-9fde-5611f1852995)

Being the maintainers of LavaMoat, we at MetaMask could not agree more with the sentiment of supply chain attacks being a major threat to BWs.

But when referring to MetaMask's security in context of "developers libraries", as was done in the paper, LavaMoat must not be left out.
Exploiting a supply chain breach to fully compromise the SRP of MetaMask is far from easy, thanks to the hard work and effort put into securing against such attacks in our BW.

That’s what the LavaMoat project is all about, as it covers multiple aspects of the following question:
If untrusted code (whether by XSS or a supply chain breach) runs inside the BW - how well is it mitigated by the BW runtime?

Not to speak for other wallets, but for MetaMask the answer would be “very well”.

Learn more about the LavaMoat stack that’s making this possible:

* LavaMoat https://metamask.io/news/security/using-lavamoat-to-solve-software-supply-chain-security/

* Scuttling https://twitter.com/weizmangal/status/1674751159003914240?s=46&t=3av-wxCFEbML6grYvIm18A

* Snow https://twitter.com/weizmangal/status/1679873336510402561?s=46&t=3av-wxCFEbML6grYvIm18A

* LavaDome (soon, stay tuned 😉)


As for the rest of the paper (sections 5, 6 and 7):

After covering the different threats, it continues to discuss leads for further research, conclusions and comparisons to HWs - all based on the former (not very rightfully concluded) described threats in sections 3 and 4:

![image](https://github.com/weizman/weizman.github.io/assets/13243797/1a60041c-3310-489e-827e-153eaaf86464)

Key takeaways:

* For strictly storing self custodial SRP/PK - HWs are safer.

* (But not for the reasons shared in the paper though).

* To use these to interact with dApps, a browser must be introduced into the flow.

* It’s not necessarily one or the other - BWs can be integrated with HWs for maximum security and interactivity.

* Need a trustworthy, self custodial BW that integrates with HWs and puts security first?

Choose MetaMask 🦊

~ Thank you [@danfinlay](https://twitter.com/danfinlay) for introducing me to this paper
