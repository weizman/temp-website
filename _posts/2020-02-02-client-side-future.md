---
enabled: true
layout: post
tags: Top,Security,JavaScript,Research,Supply-Chain-Security,Browser,Web3,Vulnerabilities,MetaMask,LavaMoat,The-Client-Side
title: Is client side security dead - or a crucial part of the future?
url: https://weizman.github.io/
date: 10/02/2024
description: Client side security is a niche tech field that seems to be unneeded for the most part. As someone who's very passionate about it, that's something that's hard for me to accept. After Shubham Shah addressed this topic in his tweet, I elaborate into the mixed feelings I have with this field, as well as present my take on the industry and most importantly, strongly argue why I think client side security isn't dying - but in fact is more crucial now than was ever before.
keywords: research, security, JavaScript, Web3, supply chain attacks, web, iframe, metamask, lavamoat, origin, dom, client side
image: clientside.jpg

---

**_tl;dr_**

> This is one of my **favorite** essays so far:
client side security is a niche tech field that seems to be unneeded for the most part.
As someone who's very passionate about it, that's something that's hard for me to accept.
After ([Shubham Shah](https://shubs.io/)) addressed this topic in his [tweet](https://twitter.com/infosec_au/status/1698322940159557987),
I elaborate into the mixed feelings I have with this field, as well as present my take on the industry and most importantly,
strongly argue why I think client side security isn't dying - but in fact **is more crucial now than was ever before**.


## Does client side security still matter?

Not too long ago, the well known security researcher [Shubham Shah](https://shubs.io/) wrote the following tweet:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">For the first 3-4 years that I was working in infosec, I found client side security so exciting. I stayed on top of every new technique and studied new techniques closely. After this, I took a step back and realised that all of my work on client side security felt helpless,…</p>&mdash; shubs (@infosec_au) <a href="https://twitter.com/infosec_au/status/1698322940159557987?ref_src=twsrc%5Etfw">September 3, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

And to me this was **magical**, because Shubham - like a good security researcher - managed to press some of my weak points **pretty accurately.**
Truth be told, I've being brewing with similar feelings for long periods of time throughout my career, and I still do. 
To this day I battle my strong desire and pure passion for the field of client side security with rational thoughts and 
the understandable wish for a long, stable and thriving career as an individual in the tech industry.

Shubham's tweet made me realize that the fact that this dilemma had taken me through multiple emotional rides throughout my career already, 
had got to the point where it's time to digest and self-reflect client side security, in terms of its **relationship with the cyber-security industry**, the **importance of its role in the ecosystem**, and its **future**.

To me, that usually means to write. Writing helps me clear my head and put my thoughts in order. In regards with the client side security industry, it's time to do just that - so **here goes.**

## Shubham's tweet

So first of all, what's all the fuzz about? 

For context, Shubham is a security researcher with a lot of experience, both with vulnerability research and with application security.
And from his tweet, it seems that his vast experience with application security had made him understand that when applications were suffering from 
security breaches, it was **almost always the responsibility of components that weren't the client side:**

> "_I analysed the reasons companies faced great hardship, and most of the time it was **not because of client side security issues** but rather **server side issues that led to critical impact** on their infrastructure._"

Shubham made me connect to his experience by expressing a similar passion he had out of hope and belief (almost self convincement?) that **securing the client side is truly important**, until it **failed to hold water** against logic and reality:

> _"For the first 3-4 years that I was working in infosec, **I found client side security so exciting.** I stayed on top of every new technique and studied new techniques closely. After this, I took a step back and realised that **all of my work on client side security felt helpless, useless, to some extent.** "_

As a security expert, responsible for auditing the security of applications by naturally going after the most impact apps can go under, Shubham had to **shift his efforts towards other areas than the client side:**

> _"A part of me thought that client side security issues still had impact to the end users (and they still do), but I **couldn't cite a single example where a company had lost so much due to a client side issue**. It really shaped my mindset and perspective for what to be looking for when auditing an application, and is **the reason why I became so deeply invested in server side security.**"_

But what really got me, was the fear of ever saying the following words:

> _"I still try and stay on top of client side security exploitation techniques, but **they don't really excite me anymore.**"_

Because knowing the industry and relating to Shubham sees things, I can see myself ending up in a similar place.
And I take this harder than Shubham **maybe**, because of the relationship I have with client side security, **for better or worse.**

## My relationship with client side security

> In this section I'll lay out some context about me and the path I went through for you to better judge my perspective on client side security and the promising future I see for it.
I encourage you to read it for the important context, but you can still decide to [skip to my take on client side security](#my-take-on-client-side-security).

### The beginning

As an 18yo Israeli, I was to serve the Israeli Defense Forces by duty.

There are many roles to take as part of this obligation, and the intelligent and/or fortunate ones serve in the Israeli Intelligence Corps, 
a batch of units which are mostly responsible for collecting valuable intel for national security. The most impactful way for achieving 
that is by practicing what you might know as "**Offensive Cyber Security**", which is a primary reason why Israel is considered to be a world-class leader in cyber-security.

<details markdown="1">
<summary>
The most popular one, which I ended up at, is called <b>8200</b> ...
</summary>
<br>

If truth to be told, on that spectrum between intelligent and fortunate, I was probably a lot closer to fortunate than intelligent.
The proof of that was the fact that the professionality gap between the training course I was accepted 
to and the team I ended up in was the result of no less than an accident (a story for another day).

Naturally, such a gap introduced significant difficulties for me, as I struggled a lot to keep up with the rest of the team. 
I was surrounded by highly competent individuals, who were each highly skilled in each of their own distinct field of expertise, whereas I was a colorless weak link. 

**It was no picnic.**

After a year and a half of doing mostly QA and struggling to learn Python, it was decided that our team should take some extra responsibility by absorbing a 
security field that belonged to another team, meaning no one in my team were familiar with that field - **Browser JavaScript (offensive) Security.**

Being the perfect opportunity for me to take on something that is not only a bigger contribution to the joint effort than the things I've done so far, 
but most importantly a chance for me to find my own color and to become an expert in a field no one else (in my team) is - **I jumped on it immediately.**

And so began the bumpy ride of mine I call "my career".

### The choice

One decade forward, and I've been focusing **almost entirely on JavaScript security.** 
Working for the best in the field, I've gained experience in **almost every client side security field** one can imagine - whether it's 
[vulnerability research](https://weizmangal.com/?tags=CVEs), 
[anti debugging](https://weizmangal.com/?tags=Anti-Debug), 
[web extensions security](https://weizmangal.com/?tags=MetaMask), 
bot detection, 
[supply chain security](https://weizmangal.com/?tags=Supply-Chain-Security) or 
[JavaScript security](https://weizmangal.com/2021/07/18/securely-snow-across/).

While fun for the most part, the ride was bumpy because for some parts of it I was unsure of **whether focusing so much on client side security is a smart move.**
Taking such an active part of this industry, I learned (the hard way) that this is a niche industry, and while you might feel pretty wanted by some companies,
**such skills won't serve you similarly for the big amount of the others.**

Leaving [PerimeterX](https://perimeterx.com/) (now [Human](https://www.humansecurity.com/)), I wanted to move on to the offensive cyber-security industry to advance my
vulnerability research and exploitation skills 
(right after finding a [major breach in WhatsApp Desktop](https://weizmangal.com/2020/02/14/whatsapp-vuln/) and a [CSP bypass in Chromium](https://weizmangal.com/2020/09/02/csp-vuln/)).

After learning more about this industry, combined with personal choices, I changed my mind and decided to pass on this industry, which got me to think - **_if not this, what then?_**

### The wrong choice?

This was a 3 months turbulence of emotions around the fear of **whether I wasted the most important years of my career on this one niche field no one has any interest of?**

I mean, being a security pro is great, the need for security specialists isn't going to end anytime soon, especially in popular fields such as cloud security.
Same goes for JavaScript - being a pro in JS and an excellent JS engineer is also a safe bet as JS is still the most popular programming language in the world.

But a strict combination of the two? Perhaps **too small of a cell in the tech industry matrix of needed skills.**

As part of this roller coaster I was fortunate enough to consult with great people I look up to on the matter. 

One of them was [Bionic](https://bionic.ai/)'s co-founder (acquired by [CrowdStrike](https://www.crowdstrike.com/)) [Eyal Mamo](https://www.crunchbase.com/person/eyal-mamo) 
which I got to know from the military service.

Eyal clearly understood where I was coming from and agreed I should **broaden my horizons so that my perspective on security is wider**, even if just slightly.

And that's how I joined Bionic for a standard FullStack software development position - a very different one from what I've been focusing on before - out of belief
**fully betting on client side security might not be the smartest thing to do.**

And while Bionic turned out to be a great experience (both for working there and for it to be later acquired), 
I left Bionic only 1.5 years later - because **the passion for client side security didn't die off, it only became stronger**, leading me to my next great next opportunity.

### The right choice

While working at Bionic, I kept learning about the world of client side security, and two initiatives I found **fascinating** were
[LavaMoat](https://github.com/LavaMoat/LavaMoat/) and [SES](https://github.com/endojs/endo/tree/master/packages/ses).

After partly wrapping my head around them and the problem they address, it came clear to me **JavaScript security is far from a solved problem - and that
directly affects browser client side security.**

At the time I was working on my own side project called [Snow](https://github.com/lavamoat/snow) to address another non-solved problem in client side 
security I refer to as [the Same Origin Concern](https://weizmangal.com/2023/09/28/the-same-origin-concern/).

I reached out to [@kumavis](https://github.com/kumavis) (the creator of [LavaMoat](https://github.com/LavaMoat/LavaMoat/)) to discuss the different problems we both attempt to address, and it made sense to
both of us that my work could be a great addition to the [LavaMoat](https://github.com/LavaMoat/LavaMoat/) project which focuses on securing JavaScript both for their main 
product ([MetaMask](https://github.com/MetaMask/metamask-extension/)) and for anyone in the world. 

</details>
<br>

... So why am I telling you all this 👆?

## My take on client side security

What does the future hold for client side security? Given my experience and perspective, I'll try to answer that.

### The death of client side security?

Referring back to Shubham's take, applications are architected so that the **backend of an app carries the core responsibility for the security** of the app.

**And rightfully so** - in contrary to the client side, **the backend is more capable** of that for being able to manifest logic that no outer entity
has access to nor the ability to tamper with, whereas with the client side it's the other way around - **anything that's being served to the client
is by definition fully accessible for it to both read and modify.**

This core principal leads to an important conclusion - **the client side is not to be trusted to begin with, so why even bother securing it?**

This hopefully gives you a taste of the anxiety I went through multiple times throughout my career - if there's no good reason to secure
the client side and this is the one single thing I feel I have an advantage in, is my career based on an unneeded skill?

Sure, there are some use cases for securing the client side, but are they niche reasons barely relevant to the tech industry, as it will
mostly focus on securing other components of their applications (probably forever)?

That's the conclusion I was arriving at when I joined Bionic to gradually migrate away from my passion for client side security.

But right before giving up for good, I decided to go for one last round by joining [MetaMask](https://github.com/MetaMask/metamask-extension/)'s [LavaMoat](https://github.com/LavaMoat/LavaMoat/) effort, to see once and for all **whether
there's still something to it, or is client side security basically a lost cause?**

### Client side security's second chance

Joining [LavaMoat](https://github.com/LavaMoat/LavaMoat/), meeting brilliant people focusing on securing the JavaScript ecosystem, I rediscovered the reasons for why **client side
security is going to matter a lot in the future** and why I personally feel **confident betting on it more than ever.**

I mostly have two main reasons in mind:

### Software Composability

This one is a reason I had in mind even before joining [MetaMask](https://github.com/MetaMask/metamask-extension/). In fact, our shared take on it is what drove [LavaMoat](https://github.com/LavaMoat/LavaMoat/) to adopt [Snow](https://github.com/lavamoat/snow) into its set of security tools.

The bottom line is that **the evolution of web application development had put us in a place where telling what code our application is going to execute is pretty much impossible**.

Saying that 10 years ago would have sounded **ridicules**, but since then supply chain driven development became so prominent that most web apps nowadays are 
composed of around **90% of code written by other entities - entities we can hardly verify nor blindly trust.**

**And trust is far from enough too**, because even if the maintainer is verified to be trustworthy for years, meaning they have no malicious intentions - **a malicious entity
can still compromise access preserved to the maintainer and abuse it.**

So from a world where unwanted code execution was mostly XSS, which can be specifically identified and mitigated, **malicious code can now be introduced from within the
application itself - a far harder form of abuse to detect.**

In addition to the form of **"Supply Chain driven development"**, Software composability comes in other forms that also require strong client side security.

**"Pluggable platforms"** are a great example - since web applications are so advanced these days, many operate as platforms, allowing developers to create
plugins to be plugged into the platform on user demand.

Shopify, Wix and more are platforms allowing developers to upload plugins aimed for users to install on top of the basic services these platform offer to enhance
the benefit they give, forming more powerful and versatile services for their users - a form of practice we'll see more and more as we go on thanks to the web
allowing JS software to easily consume smaller programs.

No reason to look too far either - [MetaMask](https://github.com/MetaMask/metamask-extension/) is also a platform which allows the extension of its basic services using developers-made plugins called "snaps".

The "snaps" plugin system required great client side security engineering (conducted by us internally) for the same reason the formers went through 
similar such careful care - those plugins are designed to run in the client side, within the app/platform itself, and that means it must endow them with some
basic capabilities while **confining them from obtaining more power in the app than they should have.**

And to make things even more **tricky** - both **"Pluggable platforms"** and **"Supply Chain driven development"** use cases can theoretically (and practically) be included and/or
executed both at runtime and build time, making it sometimes **impossible to address using backend prevention solutions** (especially for runtime).

In other words - **code we don't trust can potentially end up running in our application**, and trusting backend solutions to prevent it can no longer cut it, because **statically
identifying this is just too complex of a task.**

And when preventing something is too hard, the second-best way to tackle it is by **waiting for it to happen.**

And when it comes to breached web applications, **it _happens_ on the client side.**

Thus, the industry will have to **result into client side based detection tools** in addition to backend prevention attempts, 
as such breaches can generate big damage (potentially too big to recover from) - **a risk that companies can't afford to take**.

In the past years, attempts to create such security tools were already made (coming from the co-creator of PerimeterX [CodeDefender](https://www.humansecurity.com/products/code-defender)),
but quite unsuccessfully. Perhaps because the timing was off, or because my take is simply wrong - **time will tell**.

But one thing's for sure: **composability driven software is a great turn** - it's far more efficient ("build on the shoulders of giants") and the JS language as well as its ecosystem
specifically are well suited for such engineering methodology. The further we advance, **the more software's going to rely on other software**, and therefore the need for supporting
this long term process securely is **more important than ever** (in which the client side takes a major role IMO).

### Decentralization

> This is a more controversial one. 
Based on who usually reads my stuff, you either see and expects the upsides the Web3 paradigm barres with it (and therefore
will relate to this argument) or you're here for the JavaScript security take and this argument might not speak to you really.
If that's the case, stick around regardless. 
If you like technology and information security, **you might find this angle interesting** to think about, regardless of your stance.

Even if I'm way off about the former argument, and the problem of composable software is completely addressable from the server 
end (which it isn't) - **what if there wasn't a server to help in the first place?**

Many would claim there is a decentralized revolution in action, making this argument worth of examination at least.

In the Web3 space for example, that's **kind of the case**.

Instead of web apps you have [dapps](https://www.techtarget.com/iotagenda/definition/blockchain-dApp) (decentralized apps) which are normal web applications on the client side, 
but they connect to something slightly different from a traditional server (a common example would be the [Ethereum](https://ethereum.org/) network),
and those dapps can practically operate without a traditional server to begin with.

While somewhat unrealistic on one hand, a big portion of the Web3 industry actually expects dapps to not incorporate a server that stores/processes
user information - that's actually **a big part of the Web3 idea for many people in the first place.**

**This strongly applies to credentials** - in the Ethereum ecosystem for example, authenticating to dapps and operating them is expected to be done via the private key
of the user in front of the Ethereum network rather than some centralized-managed server (it isn't really authentication but that's good enough for the explanation).

This **dramatically shifts away** from the traditional security paradigm referred to earlier, where servers are not only expected to participate in ensuring the safety
of applications' users, but are also expected to do the heavy lifting.

But in Web3 architecture, **that's no longer possible** - for better or worse, **the most sensitive actions being performed in dapps take place in the client side** (from start to finish).

**This turns the tables** - if before **the server was such a great way to design safe applications that client side security was barely even relevant**, in Web3 context, **client side
is the only way to secure that part of the application.**

It's also important to clarify - **this extends beyond just Web3**. The idea of decentralized services is realized on other forms as well, 
such as financial services (aka [DeFi](https://www.investopedia.com/decentralized-finance-defi-5113835), e.g. [Bitcoin](https://bitcoin.org/en/)), 
P2P applications and more, but in this essay we focus on client side security in context of browsers, 
whereas client side security of other decentralized services will be affected differently depending on their supporting infrastructure.

This came very clear to me working on [MetaMask](https://github.com/MetaMask/metamask-extension/), 
and is why I'm so proud of the JavaScript security work we do - Since the [MetaMask](https://github.com/MetaMask/metamask-extension/) crypto wallet is a browser
extension that is theoretically vulnerable to the same threats described in context of dapps (and even more so being the critical bridge between dapps and the Ethereum network),
in order to not die, [MetaMask](https://github.com/MetaMask/metamask-extension/) is **forever obligated to ship the most secured client side product ever**.

And while slightly less so, **dapps and other Web3 client side services are under a similar obligation** - otherwise the idea behind Web3 (and decentralization in general) **won't ever truly take off**.

Therefore, if you see some sense in the decentralized movement and believes it's here to stay to whatever extent you can imagine, you should agree **the need for advanced
client side security technology is more critical than ever.**

## Client side security's critical role in the future

I guess this is my way of telling 5/10 years ago Gal: 

"
_**Don't panic.**_ 

_While client side security might feel like some useless niche sometimes, remember **it's also a matter of timing**._

_Telling what turns the tech industry is going to take is hard as it is such a difficult to predict industry that takes seemingly random curves occasionally._

_Those curves can be surprising and can **lead particular technological fields to the road of adoption or complete failure - it's hard to tell.**_

_And as for client side security, similarly to many other niche fields, **it might turn out just fine**._
"

At the same time, this is also my take on Shubham's observation on client side security:

When sticking to traditional client side security (XSS and such), I tend to agree it might die off a little from a security researcher perspective, as this becomes
a more and more **closed gap** both because **addressing traditional client side security is more simple** and because **traditional security architecture mainly leans on the server side**.

But given the POVs above, I believe **client side security will become more advance and more complicated**, thus naturally will **introduce new attack surfaces for researchers**.

Based on the experience of coming up with the threats the [MetaMask](https://github.com/MetaMask/metamask-extension/) app is potentially exposed to, I have multiple examples to back this claim up:

#### JavaScript Sandboxing

[LavaMoat](https://github.com/LavaMoat/LavaMoat/) is a security tool written in JavaScript and built on [SES](https://github.com/endojs/endo/tree/master/packages/ses) we maintain, with which we're able to **sandbox each of our [MetaMask](https://github.com/MetaMask/metamask-extension/) JavaScript dependencies** to confine them
and minimize the amount of damage they can do if they get breached.

#### The Same Origin Concern

[Snow](https://github.com/lavamoat/snow) is another security tool we use to prevent JS code from **being able to create new same origin realms** (aka iframes).
This is a vital tool in case sandboxed code we don't trust manages to use the limited set of capabilities we endowed it to form a new realm,
because new realms offer access to all capabilities the browser offers - including those we intentionally didn't endow it.

#### DOM Confinement

DOM API is historically designed so that you can travel **from one node to basically any other node** (and even the document itself and its owner window object) 
effortlessly, and preventing that was proven to be very hard (see the [CaJa project](https://github.com/googlearchive/caja/blob/master/src/com/google/caja/plugin/domado.js)).

[LavaDome](https://github.com/LavaMoat/LavaDome/) attempts to solve a subset of this problem, but a more complete solution doesn't seem to be coming any time soon.

### Are those actual problems though?

**Remember the context here**: for the traditional web, where the client side isn't complicated and there's a server taking the responsibility for securing the app - these problems
aren't too relevant, and **current browsers' threat model is rather enough.**

But the context here is that for use cases falling under the arguments presented above, **code running in the same origin as the app is no longer as trustworthy as it was
considered traditionally** - and the implications of that are big, because if browsers are good at isolating cross-origin entities from each other, the new take here is that
similar confinement is now necessary in a lower resolution, where **two entities within a single origin aren't trustworthy by default anymore** - which results in the security
gaps listed above.

And **that's** why I believe **the web would have to adjust accordingly** - whether by virtualized solutions such as those we compose at [MetaMask](https://github.com/MetaMask/metamask-extension/) 
or by advocating for browser-level solutions to properly address these gaps (probably both).

Furthermore - it's important to note that the success/failure of client side security is affected by more means than just technological gaps 
(such as financial/political motives within the global cyber security ecosystem), but this essay focuses strictly on the technological angle.

And with that in mind, **I expect a comeback for client side security** - for the industry, for the vendors and most importantly - **for the researchers**! 

> I don't just guess - you're welcome to further explore the work we advocate for around web and client side security which we find so important for MetaMask to become
safer as well as allow other builders to secure their apps too: 
[Gal Weizman: JavaScript realms used to bypass and eliminate web apps security tools - A problem with a WIP solution](https://weizmangal.com/2023/10/03/w3c-realms/) , 
> [Gal Weizman: JavaScript Realms: The Blank Spot In Web App Runtime Security](https://www.youtube.com/watch?v=l2l_qnEhx3M) and more