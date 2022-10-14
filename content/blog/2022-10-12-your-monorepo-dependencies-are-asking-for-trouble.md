---
title: Your Monorepo Dependencies Are Asking for Trouble
description: An exploration of a common dependency version issue in monorepo
  projects, and the method I use to solve the issue in my own projects
date: 2022-10-12T18:55:15.963Z
category: Exploration
published: false
---

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
	<p>
		Check out the repo at 
		<a href="https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-sad-app" target="_blank" rel="noopener nofollow">
			https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-happy-app?file=README.md
		</a>
	</p>
</div>

# Happy App Demo

<iframe
	loading="lazy"
	class="w-full hidden md:block" 
	style="aspect-ratio: 16/9;"
	src="https://stackblitz.com/github/andrewbrey/blog-monorepo-deps-happy-app?ctl=1&embed=1&file=README.md&hideNavigation=1">
</iframe>
