---
title: Your Monorepo Dependencies Are Asking for Trouble
description:
  An exploration of a common dependency version issue in monorepo projects, and the method I use to solve the issue in
  my own projects
date: 2022-10-12T18:55:15.963Z
category: Exploration
published: true
---

When I wrote the title of this post, I had planned on saying "please forgive me for using such a click-bait title" but
I've decided that, no, I actually do kinda think your (or, well the Royal "Your") dependency management _just might_ be
asking for trouble.

The topic I want to discuss in this post, monorepo workspaces with incompatible dependency versions, definitely doesn't
apply to every monorepo, and also, even if it _does_ apply to _your_ monorepo, there's more than one way to solve for
it.

This post will talk about the method I use in my own projects to ensure my monorepo workspaces don't use conflicting
dependency versions. _Any_ choice of how to handle this topic in your own monorepo will come with tradeoffs, and my
method is no exception. We'll talk about those tradeoffs at the end 👍.

> _Note_ — this topic isn't _exclusive_ to the JavaScript ecosystem, but it is a topic I've encountered as I work to
> build [the Lemmy App](https://lemmyapp.com), the code for which lives in a TypeScript (mostly) monorepo, so discussion
> and examples in this post will be from the perspective of a `Node` monorepo.

## The Problem

You're building an application in a monorepo so that you can share as much code as possible between different concerns
of your project. Let's say you've got a `marketing-website` workspace and a `webapp` workspace and you want them both to
use the same UI components (buttons, accordions, typography, etc), so you decide you'll make a shared `ui-lib` workspace
that both other workspaces can depend on.

For simplicity, we'll assume that these three workspaces all use `React` so there's nothing complicated about getting
the `marketing-website` to render out the `<Button />` component from the shared `ui-lib`, and similarly there's nothing
complicated about getting the `webapp` to render out the `<Sidebar />` component from the shared `ui-lib`....right?

Early in the project, yeah, that's probably true! You'll be able to just `import { Button } from 'ui-lib';` in either of
the other workspaces and you'll see a button render.

The problems lurk a little down the road when you want to bump the version of `React` that your `ui-lib` uses to take
advantage of the awesome new features available in the latest version of `React`. The components in `ui-lib` _don't
exist in a vacuum_ — they are only relevant in the context of the applications that import them, and what happens when
the applications that import them, in our example `marketing-website` and `webapp`, are on a version of `React` that is
incompatible with the newest `React` features?

<details class="px-3 py-1 bg-smoke-100 dark:bg-smoke-800 rounded select-none">
	<summary class="font-bold">Spoiler Alert!!! Only click here if you want spoilers!!1!1</summary>
	<p>💣 (It blows up at runtime...Sad App 😢)</p>
</details>

### "Sad App" Demonstration

<div class="w-full hidden md:block">
	<iframe
		loading="lazy"
		class="w-full"
		style="aspect-ratio: 16/9;"
		src="https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-sad-app?embed=1&file=README.md&hideNavigation=1">
	</iframe>
	<p class="px-4 py-2 text-sm lg:text-base leading-snug bg-white text-gray-600 border border-gray-300 rounded-b-md dark:bg-fluencyy-900 dark:text-fluencyy-100 dark:border-fluencyy-700">
		<b>FYI</b> — as of this writing, StackBlitz doesn't (can't) <i>fully</i> support embedded WebContainers in anything 
		except Chromium-based browsers. If you're in Firefox, Safari, or something else non-Chromium, you can still 
		read the project code right here but unfortunately the in-page preview won't run and you'll have to 
		<a href="https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-sad-app" target="_blank" rel="noopener nofollow">
			open the "Sad App Monorepo" demo directly
		</a> to run it. Sorry 'bout that!
	</p>
</div>

<div class="w-full md:hidden">
	<blockquote>
		<b>Hey!</b> — right here on larger screens there is an embedded demo using StackBlitz, but to be effective it needs a little more space than 
		your device provides. You'll be better served by opening the demo directly in another browser tab:
		<a href="https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-sad-app" target="_blank" rel="noopener nofollow">
			https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-sad-app
		</a>
	</blockquote>
</div>

^ that demo is a bare-bones version of the exact scenario I talked about above (minus the "marketing website"), and what
we see is that when we upgraded the `ui-lib` so that we can use the super awesome new `React.useId()` API added in
`react@18` within the `<Button />` component, but don't or _can't_ upgrade the `webapp` from where it's at (`react@16`)
to also be on `React` version 18, we get a "crash" at runtime when the `webapp` tries to render the `<Button />`...Sad
App 😢.

## What Now

Of course, in this _exact_ scenario, the fix seems pretty simple and clear - just upgrade the `webapp` to use
`react@18`, the project is tiny and it'll take about 5 seconds to safely make the change. Also, of course, this _exact_
scenario is not very realistic to the real world where you've got a lot more code of your own, a lot more code from 3rd
party libraries, and usually more people/teams involved in contributing to the project. Saying "just upgrade lol" is
almost rudely dismissive of the complexity that's potentially involved in mitigating this pain point.

So what should we do? There's lots of things we might want to look into that can help fix our broken `webapp`. We could
have the `ui-lib` declare `react@^18` as a `peerDependency` and that would at least potentially help us realize at
author-time that we're careening towards a pitfall...that would be helpful, but it doesn't actually solve the issue, and
in a lot of ways it kind of makes it worse because now we've got _another classification of dependency_ we need to worry
about managing. You don't have to look hard on Stack Overflow to find threads filled with people frustrated and confused
by peer dependencies.

Maybe there's something we could do with `package resolutions` if our package manager supports them (`yarn` does, which
is what I use)? I don't really see how that would help in this scenario, but it's the kind of thing people toss out
dismissively when you try and seek help on the internet for this type of issue.

Maybe we should just switch all of the projects to `svelte` so that we're shipping compiled-to-vanilla JavaScript and
all of our problems are solved??? (just jokin' `svelte` is super neat, and I'm eager to build something real with it,
but it's also really common for people to suggest "just use a different tool" as the solution to a problem like this,
and it annoys me)

I contend that there's really only two options available that _actually_ solve for _this_ pain point:

1. don't upgrade the `ui-lib` to use a newer version of `React` (and by extension, don't get access to new features, bug
   fixes, security patches, etc)
2. upgrade everything that uses `React` to use the newer version (and by extension, mandate upgrades to _everything_
   else that's downstream and impacted by your choice of `React` version)

as you might agree, both of these options suck. In my opinion, option 1 is like the tautological choice where "not
making a choice is a choice", and while technically a possibility especially for a short-term solution, hopefully it's
clear that it's not a viable _long-term_ option.

That leaves us with option 2, which is extra annoying, because like 2 minutes ago I said:

> Saying "just upgrade lol" is almost rudely dismissive of the complexity that's potentially involved in mitigating this
> pain point
>
> — Andrew, 2 minutes ago

so, instead I'm saying the following:

> I'm very sorry to say this dear stranger, but unfortunately, the best, or really least-bad, option available to solve
> the issue of "incompatible and shared 3rd party dependencies" is to ensure that all 3rd party shared dependencies have
> the same (or at least _definitely compatible_) version in every project that shares them.

## The Fix

### Taking a Step Back Before Going Forward

If you take another look at the workspaces in the "Sad App" Demo above, you'll notice that each workspace has a
`package.json` in which it declares its dependencies. In the `package.json` at the root of the monorepo, we tell our
package manager where to find child workspaces, and it handles the intricacies of "hoisting" everything it can from the
child workspaces into the root `node_modules` when you do an install (thus saving space on disk only keeping 1 copy of
any dependencies where it's possible to do so)...there's nothing new here, this is standard `Node` monorepo stuff and
it's the exact structure you get out of tools like `Turborepo` and `Lerna` when you initialize a brand new monorepo
project.

Unfortunately, it's this structure which ends up leading down the road to "The Problem" above. You see, by allowing each
child workspace to declare its own dependencies we're opening the door for divergence from one workspace to another when
it comes to dependencies that they "share" - in fact when using this kind of project structure, I am to the point now
where I even push back on the nomenclature of "share" in that last statement.

If two workspaces declare different _versions_ of the same `dependency name`, can we really say they "share" that
dependency? Your package manager is potentially going to end up resolving two _completely_ different sets of files to
satisfy each workspaces' declared dependencies, and at runtime, the code that gets executed could be wildly different!
In my opinion, these are "shared" dependencies "in name only".

> I'll keep using the term `dependency name` going forward, and all I mean by that is just divorcing the "name" of a
> dependency from any particular version. The difference between "my project uses `React`" and "my project uses
> `react@18`"

Not only that, but this structure of monorepo makes it harder even for diligent maintainers to keep the versions of a
given `dependency name` in sync between workspaces because as your project grows and you add more workspaces that also
need to use that same `dependency name`, you have more places to check and keep up to date. If you miss one or make a
mistake, well, bad news, your package manager isn't going to complain at you about that because it's perfectly happy and
capable of resolving more than one version, even though it's not what you want to happen - and if you're unlucky, you
won't find out about the mistake or missed update until it explodes at runtime.

Tools and scripting are definitely helpful here, at least with the mechanics of performing these updates, but tools
can't safely do this on their own (yet) and one way or another a human needs to be involved in this maintenance task.
Mistakes _will happen_.

### Implementing a Solution

At long last, time to discuss how I now go about solving "The Problem". The key insight for me was when I had that
thought from earlier about `dependency names`. Really, what I want is to have, for any given `dependency name`, **1 and
only 1** version for the entire monorepo. I don't even want the _opportunity_ for my child workspaces to declare
different versions of a given 3rd party `dependency name`.

It turns out, it's really easy to accomplish that — just put _all_ of your 3rd party dependencies into your root
`package.json`, and _none_ of them into _any_ child workspace `package.json`! With this style of declaring workspace
dependencies, when a child workspace has some code that imports `React`, the Node `require()` resolution logic will
traverse up the file tree until it gets to the root `node_modules` where it'll always resolve to the _same exact_
version of `React`, regardless of which child workspace did the import.

In many cases, there are literally no additional consideration to make with regards to the _machinery_ of managing your
dependencies<sup class="text-indigo-500 dark:text-fluencyy-400 font-bold">\*\*</sup> and you no longer need to worry
about `ui-lib` using a version of `React` that's incompatible with `webapp` or `marketing-website`...because they use
the exact same version _always_.

<i class="text-sm lg:text-base"><sup class="text-indigo-500 dark:text-fluencyy-400 font-bold">\*\*</sup>oh, for sure
there are more considerations overall, namely the tradeoffs involved here (and we'll talk about those at the end), but I
just mean with respect to the mechanics of ensuring you use one version everywhere</i>

### "Happy App" Demonstration

<div class="w-full hidden md:block">
	<iframe
		loading="lazy"
		class="w-full"
		style="aspect-ratio: 16/9;"
		src="https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-happy-app?embed=1&file=README.md&hideNavigation=1">
	</iframe>
	<p class="px-4 py-2 text-sm lg:text-base leading-snug bg-white text-gray-600 border border-gray-300 rounded-b-md dark:bg-fluencyy-900 dark:text-fluencyy-100 dark:border-fluencyy-700">
		<b>FYI</b> — as of this writing, StackBlitz doesn't (can't) <i>fully</i> support embedded WebContainers in anything 
		except Chromium-based browsers. If you're in Firefox, Safari, or something else non-Chromium, you can still 
		read the project code right here but unfortunately the in-page preview won't run and you'll have to 
		<a href="https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-happy-app" target="_blank" rel="noopener nofollow">
			open the "Happy App Monorepo" demo directly
		</a> to run it. Sorry 'bout that!
	</p>
</div>

<div class="w-full md:hidden">
	<blockquote>
		<b>Hey!</b> — right here on larger screens there is an embedded demo using StackBlitz, but to be effective it needs a little more space than 
		your device provides. You'll be better served by opening the demo directly in another browser tab:
		<a href="https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-happy-app" target="_blank" rel="noopener nofollow">
			https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-happy-app
		</a>
	</blockquote>
</div>

## Discussion

In the "Happy App" demo, you see that _any_ 3rd party dependency that _any_ of the child workspaces needs to function is
just tossed into the root `package.json` under the `dependencies` key.

<details class="px-3 py-1 bg-smoke-100 dark:bg-smoke-800 rounded select-none">
	<summary class="font-bold">Care about why I only use the "dependencies" key?</summary>
	<p>
		It's because, from the perspective of the workspace root, there's no way to know if a given dependency is for
		runtime or author-time...they're all just "dependencies" of one child workspace or another.
	</p>
	<p>
		It also helps simplify some tools that need to look up dependency versions by their name (discussed further 
		down in this section)
	</p>
</details>

Further, each child workspace declares _no_ 3rd party dependencies directly. They _do declare_ 1st party "workspace"
dependencies which enables tools like `Turborepo` and `Nx` to build a relationship graph between workspaces and optimize
task running, but technically, even these "workspace" dependencies could be omitted.

You might also notice a strange `shadow` key in the child workspaces `package.json`, under which you'll see a structure
that looks suspiciously like the top level "dependency" declaration keys, except instead of being an object declaring
names with versions, it's just an array declaring names.

This declaration of `shadow` dependencies (just a name I chose and made sense in my head) lets each child workspace keep
track of exactly which 3rd party packages it depends on, both at runtime as well as author-time, and further enables
construction of the `"effective" package.json` for a given workspace (by looking up the declared `shadow` dependencies
in the root `package.json` which knows the concrete version information).

Depending on what you're building and in particular, what your build _tooling_ looks like, construction of the
`"effective" package.json` might not matter for you. For [the Lemmy App](https://lemmyapp.com), one of the child
workspaces contains an `Electron`-based desktop app, and I'm using the `electron-builder` package to compile the app
into its distributable form for production builds.

Unfortunately, `electron-builder` doesn't play seamlessly with the "_go look in the root of the workspace to find all
dependencies_" idea out of the box when building for production, so I use the ability to construct an
`"effective" package.json` during production builds to perform a workspace-local install of my production runtime
dependencies and allow `electron-builder` to be non-the-wiser about how dependencies are managed in the monorepo
writ-large.

The monorepo for `the Lemmy App` also includes some projects that use `Vite` for builds, and these work seamlessly out
of the box with my dependency management strategy, without the need to do anything with the `shadow` dependency concept.
In fact, during development, even the desktop app uses `Vite` so for me the `shadow` dependencies only come into play
when I build that one workspace for production in CI.

> BTW, if you want to see the tooling I made to work with this `shadow` dependency concept, take another look at the
> "Happy App" demo code in the `scripts` directory at `shadow.ts`
> ([or take a look on GitHub](https://github.com/andrewbrey/blog-monorepo-deps-happy-app/blob/main/scripts/shadow.ts))

### Outcomes and Tradeoffs

#### Outcomes

- There is a single canonical version of every single `dependency name` for the entire monorepo - "The Problem" from
  above is not possible.
- It's easy to adopt the solution and requires no ongoing curation of your child workspace dependency versions to keep
  them in sync.
- Guaranteed to minimize disk space usage and install time for the monorepo because there's only 1 version of each
  `dependency name` and they all live in the root.

#### Tradeoffs

- You now **must** deal with _any and all_ version migrations/breaking changes across your entire fleet of child
  workspaces all at once when you upgrade a dependency.
  - For my own projects, I find this to be a positive tradeoff. If this project lives for a while, I'm going to be
    handling those breaking changes eventually anyway, and if I just handle them all at once, it's easier and then I can
    forget about them rather than have to keep the steps of the upgrade in my working memory for longer. That said, if
    my typical project had dozens of complex apps and doing an upgrade of `React` in my monorepo meant committing to an
    hour of changes for each of them before I can be productive again, I would definitely consider if the risks of "The
    Problem" as outlined above are acceptable.
- You now may need to choose solutions or 3rd party dependencies more carefully because you can't (shouldn't) massage
  versions on a single workspace.
  - Technically, if you really needed to, you could still have child-workspace-level 3rd party dependencies declared
    that could bypass the pain point of 3rd party dependencies that don't play well together at the versions enforced by
    your `only 1 version allowed` rule. That has not come up for me, but if it did, I think I would prefer a solution
    that uses a different 3rd party dependency altogether (or a vendored/`patch-package`'d dependency) before I
    introduced an exception to my `only 1 version allowed` rule.
- For this solution to be effective, you _should_ put safeguards in place to ensure nobody accidentally adds a 3rd party
  dependency to a child workspace directly.
  - I wrote both a custom `ESLint` rule and a `git pre-commit` hook to guard against this at author-time.

### Further Reading

I started thinking about this topic when I began building [the Lemmy App](https://lemmyapp.com) which was the first
project I had ever started that used a monorepo. Admittedly, "The Problem" as outlined above wasn't something I actually
encountered, just something I felt confident I _would_ encounter eventually and so I wanted a solution to it in hand.

I thought a lot about it and came up with the solution outlined in this post and implemented it without doing much
outside research as to the "state of the art" on the topic.

Since then I have discovered that `Nx` actually has thought a lot about this topic too (not surprising) and that they
even have terminology to ascribe to the strategies I talk about in this post;
[Package Based Monorepo](https://nx.dev/getting-started/package-based-repo-tutorial) is the name that they use to refer
to a monorepo with the dependency management strategy like that of the "Sad App" in my post. Then,
[Integrated Monorepo](https://nx.dev/getting-started/integrated-repo-tutorial) is the name that they use to refer to a
monorepo with canonicalized dependency versions as in the "Happy App" in my post.

I was pretty chuffed to learn that they even have the same `"effective" package.json` concept in their
`integrated monorepo` structure, though they construct it by parsing your source files rather than relying on a `shadow`
dependency manifest.

> Note, I am not an expert on the `Nx` flavors of monorepo, so I am probably missing a lot of details here. I just
> thought it was interesting continued reading on the topic!

## Closing Thoughts

I do not think that the steps taken in this post are right, or even necessary, for _every_ monorepo out there, but with
how hot the topic of monorepos is right now, I do think that it's important that potential monorepo pitfalls receive due
consideration. Hopefully now, after reading, you're slightly better prepared to deal with a potential issue in your own
monorepo. Thanks for reading!

**Cheers!**
