---
enabled: true
layout: post
tags: Top, Security, JavaScript, Research, Supply-Chain-Security, Browser
title: The Same Origin Concern
url: https://weizman.github.io/
date: 28/09/2023
description: "This document focuses on the “same origin concern”, describing the lack of control apps have over new realms that rise under their own origin, as well as its implications on their safety, how current efforts to address it fail and what browsers can do to help ship a secure and performant solution for the problem"
keywords: CSP, javascript, web, security, realms, iframe, browser, sop, supply chain, composability
---

## Summary

> Taken from the [official document "The Same Origin Concern"](https://weizmangal.com/content/pdf/The%20same%20origin%20concern.pdf)

* Fortunately, web and browsers continuously evolve towards a composability driven software development future.
* While it is good, such methodology bears great security risks, where integrated software may introduce malicious code to the composed software, endangering it entirely. 
* Therefore, ongoing efforts by security leaders are being made to introduce safety mechanisms to allow apps to unlock composability’s full potential with minimal risk.
* One effort in particular focuses on providing better visibility and control over the flow of the app at runtime, to uncover unexpected behavior in the case of it resulting from malicious intentions - a most reasonable natural outcome of the difficulty in securing composable web apps.
* However, the road to secure composable software is long and yet to be over, as critical infrastructures must continuously evolve accordingly.  
* This includes browsers, which in order to enable such initiatives might require similar adjustments, to help composed software thrive.
* Therefore, we wish to focus on one specifically being what we refer to as the “same origin concern”, where we identify a need for some level of protection/isolation of the main realm of the application from any sibling/adjacent realms of the same origin (some subset of what the Same Origin Policy provides for cross origin realms isolation is another way of thinking about it).
* Not only did we identify this issue, but we also bring a working shim of the solution we imagine, which effectively demonstrates the security hardening we seek for applications against this concern in production.
* Problem is,  as part of this effort, we learned that a shim representation of the solution is insufficient in terms of both performance, but most importantly security.
* Which helped us arrive at some conclusions, the main one being that adequately securing this layer of concern performantly can only be done with some help from the browser itself.
* In this document we wish to further explain the motivation for this, the problem we encounter, the solution we attempted at and the solution we believe would be best to properly address it.
