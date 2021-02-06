---
title: Nix — The Simple Noise Mixer
description: How I built a simple brower extension to add a background / "white
  noise" machine to Chrome and Firefox
date: 2021-02-06T23:07:37.863Z
category: Projects
featuredImage: ../assets/uploads/global_screenshot.png
published: false
---
When I'm working at my computer, I really struggle to get into a flow and be productive if I don't have *something* playing in my headphones. Usually that something is music, but lately I've been really into `soundscape` types of background noise, like the kind you get in white noise apps and websites. I used a few different sites for this, but with each, I kept finding myself wanting for the noise mixer to be:

- a standalone thing I could control with keyboard shortcuts, not another website tab
- usable offline for when I'm working without internet
- simpler and easier to make a mixture of sounds that would be my "preferred" mix, which would be remembered when I came back

Basically I wanted to be able to turn on my favorite mixture of `rain + fire crackling + thunder` every time, with as few clicks as possible, even if I don't have internet.

None of the sites I found ticked all these boxes, so I decided I would make it on my own. I decided to do so as a browser extension to take advantage of the fact that it elevates the functionality to an "always there, ready when you are" status. It also made it super simple to remember the most recent mix I had playing, and more generally, I find it really fun to make extensions for the browser!
