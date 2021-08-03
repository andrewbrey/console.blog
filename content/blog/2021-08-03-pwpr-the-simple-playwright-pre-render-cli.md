---
title: PWPR - The simple Playwright Pre-Render CLI
description: The simplicity of making an HTTP request with cURL but with the
  ability to run and render JS powered web pages
date: 2021-08-03T22:07:16.151Z
category: Projects
featuredImage: ../assets/uploads/pwpr.png
published: false
---
Recently, while working on automating the installation and setup of my computer I encountered an annoying situation. I was trying to script out the installation of Dropbox, and I didn't want to hard code in an installer version - for all other tools and applications that I "manually" install with scripts I've been able to obtain explicit version information programmatically. For some I could get version information via dedicated webpages (e.g. `golang` which provides its [current version here](https://golang.org/VERSION?m=text)). For others, which host their release assets on GitHub I could use the GitHub Releases API (e.g. the `starship` shell prompt, [which uses GitHub Releases](https://api.github.com/repos/starship/starship/releases/latest)). In fact, up until Dropbox, the only tool which made this even _a little_ difficult was the `aws-cli` which required that I parse their [CHANGELOG file](https://raw.githubusercontent.com/aws/aws-cli/v2/CHANGELOG.rst) to figure out the latest version.

For Dropbox though, the only good way I could programmatically discover their latest installer version was via a link present on the download page, which for me being on Linux ([Pop!_OS specifically](https://pop.system76.com/)) is [https://www.dropbox.com/install-linux](https://www.dropbox.com/install-linux). If you go there, you might think "_ok seems easy enough, just curl/wget the page and grab the href for the .deb file download link with grep_" and that is indeed what I tried at first....then I realized that this _incredibly simple and text-only_ page is completely javascript rendered, meaning that curl-ing it is useless as I will only get back the pre-javascript-render page shell.

As annoying as this was, I didn't just settle for hard coding in the version for this one thing, and instead I looked around for a CLI wrapper for either [Playwright](https://playwright.dev) or [Puppeteer](https://pptr.dev/) which are tools I've used extensively before to do browser automation via headless chromium, firefox, and webkit. Either of these would make it possible for me to visit the page, render the page with JS, then get the final page HTML. As it turns out, Playwright does have a first-party CLI, but amazingly to me, it's mostly geared towards PDF creation and automation of writing Playwright procedures - not prerendering...this seems like super low hanging fruit, but ahhhh well.

Aaaanyway, I decided just to make my own wrapper for Playwright, so here it is!

## 🎉 Announcing `PWPR - The simple Playwright Pre-Render CLI` 🎉 

You can find it on NPM at [https://www.npmjs.com/package/pwpr](https://www.npmjs.com/package/pwpr). You don't need to install it to use it (in fact, I don't recommend that you _do_ install it) - simply run:

```bash
npx pwpr --url=example.com --output=example.html
```

doing this will fetch `https://example.com`, wait for it to fully load, including running the page's javascript, then output the rendered HTML of the page to `example.html` in your current working directory - it's like the simplicity of cURL, but with the ability to run the JS of the page you're fetching.

>  Of course, the source code is fully open source and `MIT` licensed, so check that out on GitHub --> [andrewbrey/pwpr](https://github.com/andrewbrey/pwpr)

With this, I've been able to keep my Dropbox install simple and programmatic, without any version hard coding. Hopefully someone else out there finds it useful!

**Cheers!**

