---
title: 'Building my blog with Gatsby, TypeScript, Tailwind, and Netlify CMS'
description: How I built a GatsbyJS + Typescript + TailwindCSS + Netlify CMS blog website
date: 2020-03-29T00:00:44.855Z
category: Projects
---
For the last several weeks as I've been searching for a new job I have been surprised to find that not only is `React` a whole lot hotter than `Angular` where I am in Seattle, but it's honestly not even really close. I have spent the last 2.5 years on a weird little island [doing consulting work](https://www.fluencyy.com) where I could freely pick the tech stack for client projects and I tended to err on the side of what I knew best (i.e. `Angular`) so that my time wasn't spent fiddling around with a unfamiliar technology.


Now that I've come back from my blissfully unaware island, it really feels like my corner of the web development world (i.e. the somewhere-between-a-startup-and-a-small-company world) has more or less left `Angular` in the past and is significantly more focused on `React` and to a lesser extent `Vue`. I have only ever worked with these two technologies a tiny bit and I felt like if I wanted to stay sharp on what is in demand, I should get a bit more experience with `React` under my belt - so I decided to indulge a long time *I should really build a blog* feeling and...well, build a blog.


You are reading this on the blog that I built with [GatsbyJS](https://www.gatsbyjs.org/), a framework for taking components written in `React`, filling them up with data sourced from a `GraphQL` layer that supports a really diverse set of data sources, and spitting out pre-rendered "static" content that is much friendlier for SEO in the same way that server rendered content is, and which can then be "re-hydrated" into a fully dynamic `React` application on the client - I think it's incredibly neat technology!

## Project objectives

There were a few goals I had with this project (besides the previously stated "build a blog in React"):

- Build it as an open source project which serves as a demo of how to build such a blog

  🎉 All source code for this blog can be found on my GitHub profile: [andrewbrey/console.blog](https://github.com/andrewbrey/console.blog)

- Incorporate `TailwindCSS` (and possibly `Tailwind UI`) which has quickly become my favorite way to build and style web content

- Build the `React` components in `TypeScript` instead of using `PropTypes` for type checking

  > Incidentally, I read a post on the React Native blog this week where there was discussion of moving the code base to using build-time type checking (presumably by moving to TypeScript?) rather than using run-time checking - does this imply PropTypes enforce run-time type safety? I need to look into this more...

- Get it hooked up to `Netlify` and `Netlify CMS` for builds, deploys, and content management

## Diving in to the details

As mentioned before, this whole project is [open source](https://github.com/andrewbrey/console.blog) and **MIT** licensed so feel free to skip this write up and dig in to the code if that's more your thing, but if you're interested in my color-commentary on the experience of building, read on!

### Overview

There are a few bullet points outside of the project objectives that I think are worthy of mention that I'll present here in a group:

- All of the content for the blog is written in **Markdown** as part of the git repository for the blog source code. The `.md` files are transformed into HTML through a series of `Gatsby` plugins, collectively found in a file called `remark.plugin.ts` which is part of the overall `Gatsby` framework configuration. As you might guess, the plugin is called `Remark` and it has several accompanying plugins that do things like extract referenced images to the `static` asset folder upon build, calculate the reading time for a post based on the number of words, and add code syntax highlighting to *code fenced* snippets.
- If you look at the markdown stuff just mentioned, you'll see that I have all of the framework configuration in a "non-standard" location (at least as far as I've seen on other `Gatsby` blogs), namely a `config` directory. The code is also written in `TypeScript` and I leverage `ts-node` within the "normal" configuration files to allow me to import `.ts` code into the typical `.js` configs.
- I'm using several other plugins for things like the [rss feed](https://blog.andrewbrey.com/rss.xml), the [sitemap](https://blog.andrewbrey.com/sitemap.xml), and the Netlify redirect/header/caching rules - many of these plugins require no manual configuration for my use case.
- You'll notice that I have a `.devcontainer` directory that has some `Docker` related content inside. This is configuration that allows me to run my local development environment inside of a container and attach my (container host) instance of the **Visual Studio Code** GUI to the running container instance. I get the isolation, reproducibility, and portability of containers with the nice editor experience and tools of `vscode` - a very nice combination! If you're interested in learning more, check out the `vscode` article [on developing inside containers](https://code.visualstudio.com/docs/remote/containers).

### Using TailwindCSS

There is a `Gatsby` plugin for [TailwindCSS](https://www.gatsbyjs.org/packages/gatsby-plugin-tailwindcss/), but I opted to instead add Tailwind myself using the "preferred" installation method discussed on the Tailwind [documentation site](https://tailwindcss.com/docs/installation/#using-tailwind-with-postcss) which meant using `PostCSS`. This worked better for me as I knew I was going to be adding other `PostCSS` plugins (namely `PurgeCSS` and `Autoprefixer`) and I wanted to have as little `Gatsby` dependency as I could for this set of configurations. After adding the [PostCSS](https://www.gatsbyjs.org/packages/gatsby-plugin-postcss/) plugin, I was off to the races.

### Using TypeScript

Again, this was pretty straight forward - just install the [Gatsby TypeScript plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/) and add a `ts-config.json` to the root of the project! Don't forget to also add `ts-node` as a **devDependency** in your *package.json* so that you can make use of `.ts` and `.tsx` files in your `Gatsby` configurations.

### Using Netlify and Netlify CMS

This was the goal that took the most fiddling to get working exactly right. In order to generate Netlify deployment configuration files when you run `gasby build`, you need only add the [Netlify plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-netlify/) with no extra configuration, but in order to use [Netlify CMS](https://www.netlifycms.org/) (which is a **git based** static site generator CMS) I ended up having to take more manual control of the configuration than I originally wanted. To facilitate this, I grabbed the [Netlify CMS plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-netlify-cms/), which generates the **admin** page on your behalf, and *critically*, has support for customizing the runtime CMS configuration within `js`/`ts` (which I have done in `src/cms/index.tsx`). This allows me to run the CMS using a local git proxy server (also a Netlify offering, see [the beta features documentation for details](https://www.netlifycms.org/docs/beta-features/)) when I'm in my local environment, and using the *real* Netlify git proxy API in production, all without maintaining local file modifications that I have to remember to stash before committing!

Another thing I customized in here was the blog post *preview template* which allowed me to make the admin editing experience produce a preview that looks just like (well, very close to) the final rendered site which is very helpful!



That's about it for the tour - there is more code in there but a lot of this an adaptation of the [Gatsby stater blog template](https://github.com/gatsbyjs/gatsby-starter-blog) so it should be close to familiar to anyone who has toured other `Gatsby` blog repositories - this just has a sprinkling of my personal preferences and technology choices on top!

**Cheers!**