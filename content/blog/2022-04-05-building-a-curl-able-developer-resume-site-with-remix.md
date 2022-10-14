---
title: Building a cURL-able Developer Resume Site with Remix
description:
  A little experiment in how to build a developer resume website with Remix, deployed to Vercel, that looks great in
  both the browser and when fetched with cURL.
date: 2022-04-05T23:13:34.649Z
category: Tinker
featuredImage: ../assets/uploads/remix-curl.png
published: true
---

A couple of weeks ago I wanted to give building something with [Remix](https://remix.run/) a shot, so I made a small
application called [WAEL](https://github.com/andrewbrey/wael) for tracking my weight and exercise over time. While
building WAEL I was absolutely blown away by Remix! It was an absolute delight to use and the abstractions felt so
simple and intuitive. I've used a lot of frameworks and tools in my time as a web developer, and really, nothing has
impressed me as much upon first use as Remix has so far.

> BTW, maybe I'll make a separate post talking about WAEL at some point, but in the mean time, it's open source so if
> you're interested feel free to just poke around in the repository -->
> [https://github.com/andrewbrey/wael](https://github.com/andrewbrey/wael)!

Since I finished _that_ project my brain has been churning so much with ideas of things I could build with Remix, and
yesterday I had the idea that it would be super cool to build a resume site with Remix that was as you expect when you
visit it in the browser, but has a beautiful terminal output when you visit it with `cURL`.

## 🎉 Here it is! `Remix Curl Demo` 🎉

Check it out at [https://remix-curl.vercel.app](https://remix-curl.vercel.app)

You can visit this page in the browser and it will serve up a static `text/html` response (which you might imagine is
your resume content) and you can _also_ `curl` this page in your terminal and see a beautiful `text/plain` response that
contains style ansi escape codes that your terminal can use to print a nice interface.

> Of course, the code is fully open source and `MIT` licensed, so check that out on GitHub -->
> [andrewbrey/remix-curl](https://github.com/andrewbrey/remix-curl)

As I expected this was honestly pretty trivial to put together and I think that really speaks to the seamlessness of the
abstractions that the Remix team has built. I spent more time getting `Vercel` to play nicely with my use of
`patch-package` than I did actually building the site!

I could totally imagine building a fully fledged resume that renders beautifully in both the browser and in a terminal,
and, while pretty dumb and mostly pointless, who knows what hiring decision some manager might make to hire you because
you impress them with your silly `cURL-able` resume!

**Cheers!**
