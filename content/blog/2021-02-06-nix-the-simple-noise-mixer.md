---
title: Nix — The Simple Noise Mixer
description: I built a simple brower extension to add a background / "white noise" machine to Chrome and Firefox
date: 2021-02-06T23:07:37.863Z
category: Projects
featuredImage: ../assets/uploads/global_screenshot.png
published: true
---

When I'm working at my computer, I really struggle to get into a flow and be productive if I don't have _something_
playing in my headphones. Usually that something is music, but lately I've been really into `soundscape` types of
background noise, like the kind you get in white noise apps and websites. I used a few different sites for this, but
with each, I kept finding myself wanting for the noise mixer to be:

- a standalone thing I could control with keyboard shortcuts, not another website tab
- usable offline for when I'm working without internet
- simpler and easier to make a mixture of sounds that would be my "preferred" mix, which would be remembered when I came
  back

Basically I wanted to be able to turn on my favorite mixture of `rain + fire crackling + thunder` every time, with as
few clicks as possible, even if I don't have internet.

None of the sites I found ticked all these boxes, so I decided I would make it on my own. I decided to do so as a
browser extension to take advantage of the fact that it elevates the functionality to an "always there, ready when you
are" status. It also made it super simple to remember the most recent mix I had playing, and more generally, I find it
really fun to make extensions for the browser!

## 🎉 Announcing `Nix - the simple noise mixer` 🎉

You can find it on both the
[Chrome Web Store](https://chrome.google.com/webstore/detail/nix-the-simple-noise-mixe/okhnofjkdbkfhkfmlggbnghhfeimfdhm)
and the [Firefox Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/nix-the-simple-noise-mixer/)!

> Of course, the extension code is fully open source and `MIT` licensed, so check that out on GitHub -->
> [andrewbrey/nix](https://github.com/andrewbrey/nix)

It was super fun and quick to build, and here are some highlights:

- I used `React` for the UI. I've really come to enjoy working in `React` especially with the way that you're are
  incentivized so early to make small component abstractions with almost no overhead - I really enjoy this over the
  "_ugh, I guess I need a whole new file for this thing, and what folder should it go into??_" questions that come with
  `Angular` and `Vue`.
- I used [ActiveJS](https://activejs.dev/#/) for observable state management, and it was positively delightful! I have
  been itching to give it a try for a while now, and I found it's blend of `rxjs` observables (which I mostly liked from
  my time doing `Angular`) with the `redux`-like store-with-actions model to be such a nice middle ground between the
  different state solutions I've used. It you've never heard of `ActiveJS` before, I strongly recommend poking around in
  their docs and learning all it can do, it's really neat.
- I used `Tailwind CSS` - at this point, I don't imagine I'll ever use anything else for styling on a personal project.

I really enjoy building browser extensions, and this one didn't break that trend - it's quite simple, but with just
enough surface area to have presented a challenge or two, mostly around picking the right architecture and message
passing controls exposed to the popup by the background. Give it a try and see what you think - I find it quite nice
when I'm really trying to be productive 👍

**Cheers!**
