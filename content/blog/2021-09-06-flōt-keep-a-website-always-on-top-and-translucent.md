---
title: Flōt - Keep a website always-on-top and translucent
description:
  Flōt lets you place a website on top of other windows, but allows you to see through to the content underneath. The
  perfect amount of distraction.
date: 2021-09-06T16:43:17.204Z
category: Projects
featuredImage: ../assets/uploads/flot.png
published: true
---

If you've followed along with my blog post history or my projects [in GitHub](https://github.com/andrewbrey), you might
already know that I tend to work best when I'm like...12% distracted by something - that's part of why I made
[the Nix browser extension](https://chrome.google.com/webstore/detail/nix-the-simple-noise-mixe/okhnofjkdbkfhkfmlggbnghhfeimfdhm)
(see the accompanying [blog post about it here](https://blog.andrewbrey.com/2021-02-06-nix-the-simple-noise-mixer/)),
and it's why I recently took a liking to watching tv shows in a teeny-tiny little browser window in the corner of my
screen while I work.

As I have done this however, I couldn't help wishing that the browser tab with a show in it was slightly less
noticeable, and if I completely had my druthers, if it were translucent so I could see what was beneath it. I looked
around the internet and really only found one app which promised to provide these features and that was the
[Pennywise app](https://github.com/kamranahmedse/pennywise), but as best as I can tell it's unmaintained (or at most
minimally) and either way it didn't work correctly on my computer which runs Linux.

I decided to take it on myself to whip up a weekend project to scratch my own itch, and from that, an app was born!

## 🎉 Announcing `Flōt - Keep a website always-on-top and translucent` 🎉

You can find it for download on the official website [https://flot.page](https://flot.page). It supports Mac, Windows,
and Linux and works a treat.

**Key features include**:

- Adjustable transparency
- Clean and minimal interface
- "Ignore clicks" mode which causes the window to ignore your mouse and allow you to click what is behind it - pretty
  handy!

There were some surprisingly interesting challenges to solve with this tiny little app, and one of the big ones was how
to both (a) not break the adjustable transparency for any platform while (b) being able to view most sites.

The problem statement here is that transparency of apps in Electron is somewhat tricky and breakage-prone. If you Google
around, you'll find _tons_ of issues people have made about transparency not working in their app, especially on Linux.
Many app developers just say "meh, my target audience isn't Linux, so I don't care" but for me, since _I am my target
audience_ and I _do use Linux_ this was a must have! It turns out that the simplest way to ensure transparency works for
the embedded content is to put it in an `iframe` so that the child site can be styled like any other piece of DOM...but
now the child is in an `iframe` which means you're dealing with a whole mess of web security and sandboxing topics for
the embedded content that you don't normally have to mess with when a page is the top frame. Many sites, especially ones
a user of this app might be interested in viewing, have same-site restrictions for when they are placed in an `iframe`
and many also have very restrictive `x-frame-options` headers applied when their content is served. All of this lead
initially to being unable to display a lot of sites like YouTube and Twitch and Vimeo within Flōt.

I could get around this by making the target site the top frame, which in Electron terms would mean giving it its own
`BrowserWindow` object, essentially another Chromium tab, within the app but if I did this, I would only have control of
transparency to the extent made possible by Electron for `BrowserWindow` objects, which is to say, none (on Linux
anyway). For Mac and Windows, Electron can do adjustable transparency of the window, but for Linux your either are fully
transparent or you are not. In the `iframe` world, I could just make the app window transparent for all platforms, and
use the transparency of the DOM to control just how see-through the content is.

In the end, I decided to keep the initial design, using `iframes` since the adjustable transparency was a key feature
for me, and I used request interception in the Electron main process to ignore certain security features browsers are
supposed to enforce, such as `x-frame-options` headers and `content-security-policy`. This makes it so sites _can be
embedded_ (mostly, there are some things which still break it seems) and I also get to keep my transparency controls in
the DOM rather than on the native window...just, at the expense of pretty reduced browsing security.

Something had to give to meet my goals for the app, and I decided that this app was a toy which wasn't meant to be used
as a regular browser - instead I use it is a "read only" window for publicly accessible pages where I don't enter my
credentials or any sensitive information into the sites I visit. For this purpose, it works quite well and it was very
fun to build, so I think all-in-all it was worth the few days of diversion!

**Cheers!**
