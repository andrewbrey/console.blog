---
title: Your Monorepo Dependencies Are Asking for Trouble
description:
  An exploration of a common dependency version issue in monorepo projects, and the method I use to solve the issue in
  my own projects
date: 2022-10-12T18:55:15.963Z
category: Exploration
published: false
---

When I wrote the title of this post, I had planned on saying "please forgive me for using such a click-bait title" but
I've decided that, no, I actually do kinda think your (or, well the Royal "Your") dependency management _just might_ be
asking for trouble. The "issue" I want to discuss in this post definitely doesn't apply to every monorepo, and also,
even if the issue _does_ apply to your monorepo, there's more than one way to solve it.

## Sad App Demo

<div class="w-full hidden md:block">
	<iframe
		loading="lazy"
		class="w-full"
		style="aspect-ratio: 16/9;"
		src="https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-sad-app?ctl=1&embed=1&file=README.md&hideNavigation=1">
	</iframe>
	<p class="px-4 py-2 text-sm leading-snug bg-white text-gray-600 border border-gray-300 rounded-b-md dark:bg-fluencyy-900 dark:text-fluencyy-100 dark:border-fluencyy-700">
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

# Happy App Demo

<div class="w-full hidden md:block">
	<iframe
		loading="lazy"
		class="w-full"
		style="aspect-ratio: 16/9;"
		src="https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-happy-app?ctl=1&embed=1&file=README.md&hideNavigation=1">
	</iframe>
	<p class="px-4 py-2 text-sm leading-snug bg-white text-gray-600 border border-gray-300 rounded-b-md dark:bg-fluencyy-900 dark:text-fluencyy-100 dark:border-fluencyy-700">
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
