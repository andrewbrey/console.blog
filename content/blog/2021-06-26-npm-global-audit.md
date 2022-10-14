---
title: NPM Global Audit
description: Making it possible to run npm audit against globally installed node modules
date: 2021-06-26T21:36:15.642Z
category: Projects
featuredImage: ../assets/uploads/npm.png
published: true
---

I've found that it's a good idea to keep as much of the software what I use every day up to date, and that includes the
handful of node modules I have installed globally on my system - this is a pretty short list with "generally useful"
things like [rimraf](https://www.npmjs.com/package/rimraf), [time-tracker](https://www.npmjs.com/package/time-tracker),
[live-server](https://www.npmjs.com/package/live-server) (plus a few others). Towards the goal of keeping things up to
date, I have made running [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) against my various
packages a habit, and this includes doing a daily update of all the modules I have installed globally. When you do an
update against your globally installed modules, just as you get with a locally installed module, the `npm` cli will
usually spit out some warnings about vulnerabilities in the packages you have installed and will then tell you to run
`npm audit` to learn more...

<br>

Well, if you try and run `npm audit -g` or something similarly sane to attempt an audit against your globally installed
packages, you learn that `npm` won't do that for you. I don't fully understand the rationale for this limitation, but
whaaaatever, I've decided to address the limitation myself!

<br>

I have released [npm-global-audit](https://www.npmjs.com/package/npm-global-audit), an `MIT` licensed and
[fully open source](https://github.com/andrewbrey/npm-global-audit) node module which can perform an `npm audit` of your
globally installed node modules. You don't even need to install it to use it (in fact, I don't recommend that you _do_
install it) - simply run:

```bash
npx npm-global-audit
```

from your terminal, and away it goes! There is more detail about how it works in the `README` for the project, so feel
free to have a poke about to learn more. Hopefully this will help someone out there who likes to stay aware of the
outstanding issues present in their software, at least for javascript.

Cheers!
