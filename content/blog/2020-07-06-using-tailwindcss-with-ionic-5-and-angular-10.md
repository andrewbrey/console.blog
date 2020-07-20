---
title: Using TailwindCSS with Ionic 5 and Angular 10
description: How you can add TailwindCSS to an Ionic 5 and Angular 10 mobile app
  without ejecting or messing with the Angular webpack build
date: 2020-07-06T02:15:33.227Z
category: Tutorial
featuredImage: ../assets/uploads/ionic-angular-tailwind.png
published: true
---
Recently for some client work I had to dig back into an [Ionic Framework](https://ionicframework.com/) mobile app code base which I had most recently edited over a year ago. In the intervening time since my last commits in that project I have seen the light of `utility` / `functional` / `atomic` CSS, thanks in no small part to [Adam Wathan](https://twitter.com/adamwathan) the creator of [TailwindCSS](https://tailwindcss.com/) and his [blog post from 2017](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/) where he talked about his evolution from so called *semantic CSS* to embracing utilities.

> Another great discussion of the merits of utility CSS (and why you should be using it) can be found in [John Polacek's](https://twitter.com/johnpolacek) awesome presentation [Rethinking CSS](http://johnpolacek.com/rethinking/).
>
>There is also a wonderful talk by Simon Vrachliotis from years ago called [A Real-Life Journey Into the Opinionated World of "Utility-First" CSS](https://vimeo.com/294976504) which also does an excellent job of showing the logical progression going from semantic css to utility css.

As I was working I found myself over and over *wishing so badly* that the ergonomics of styling the prebuilt Ionic components could be as pleasant as the experience of working with Tailwind, and then inspiration struck! ***Why don't you just add Tailwind to the project dummy??***. I don't know why it took such rude comments from myself to make me think of simply adding Tailwind to make the styling experience nicer but hey, whatever it takes right?

## Adding TailwindCSS to a vanilla Angular CLI project

Before talking about what it takes to add Tailwind to augment the prebuilt styles of Ionic components, I'll first touch on how I've been successful adding it to a plain ol' Angular project, without having to `eject` the `webpack` configuration from control of the Angular CLI.

Since Angular doesn't use the `PostCSS` loader with webpack, we can't just tack another `require` onto the `postcss.config.js` to include Tailwind. What we *can do* however is simply compile our Tailwind directives ahead of time with the `tailwind` node binary executed from `npm` scripts (or a tooling of choice) *before* the Angular webpack build starts such that the pre-built stylesheets can then be included in the webpack build as if they were regular CSS.

If you're using  `sass`/`scss` this is even easier because you can leverage `@import` syntax in the `scss` compiler to include the `tailwind.css` (or whatever you name your file) in your final bundle. If you're not using `scss` you can still make Angular aware of the file by pointing to it in your `angular.json` builder definitions for included styles.

This works quite well but isn't as convenient as we might like - in particular one thing we might want is for file watchers on our source files to include the `tailwind.config.js` so that changes to our Tailwind config trigger a rebuild of our Tailwind styles and subsequently the styles Angular knows about. It's not always straight forward to create this type of behavior but thankfully there's a very nice little node module (isn't there pretty much always?) called [ng-tailwindcss](https://github.com/tehpsalmist/ng-tailwindcss) which not only gives you the setup I described above, but also sets up file watchers for you that will rebuild your Tailwind styles whenever you change your Tailwind config and ties the whole thing up in a nice little bow!

> I won't go into detail about how to set up `ng-tailwindcss` as it's well covered by the helpful README - one thing to point out is that it's not required to use the integrated `PurgeCSS` from this package because Tailwind now includes a first class `PurgeCSS` integration out of the box.

## Adding TailwindCSS to Ionic 5 with Angular

Well it probably shouldn't come as too much of a surprise that much of what was true for a vanilla Angular project is still true for Ionic + Angular, because since Ionic 4, the framework shifted to Web Components and became decoupled from Angular. In doing so, they largely got out of the business of project structure and defer to the chosen framework to make those choices.

That said, here's what the default Ionic 5 with Angular `global.scss` looks like for a project scaffolded with the `blank` starter:

```scss
/*
 * App Global CSS
 * ----------------------------------------------------------------------------
 * Put style rules here that you want to apply globally. These styles are for
 * the entire app and not just one component. Additionally, this file can be
 * used as an entry point to import other CSS/Sass files to be included in the
 * output CSS.
 * For more information on global stylesheets, visit the documentation:
 * https://ionicframework.com/docs/layout/global-stylesheets
 */

/* Core CSS required for Ionic components to work properly */
@import '~@ionic/angular/css/core.css';

/* Basic CSS for apps built with Ionic */
@import '~@ionic/angular/css/normalize.css';
@import '~@ionic/angular/css/structure.css';
@import '~@ionic/angular/css/typography.css';
@import '~@ionic/angular/css/display.css';


/* Optional CSS utils that can be commented out */
@import '~@ionic/angular/css/padding.css';
@import '~@ionic/angular/css/float-elements.css';
@import '~@ionic/angular/css/text-alignment.css';
@import '~@ionic/angular/css/text-transformation.css';
@import '~@ionic/angular/css/flex-utils.css';
```

You'll notice that there are *already some* utility stylesheets included with the framework - I don't want those since I'm going to be using Tailwind and I also need to make sure that I include Tailwind's version of normalize because it does one or two things a reset doesn't normally do, namely adding a default border color of `gray-500` that would otherwise normally have a default border color of `transparent`.

> If you're curious, this is so that you can simply add `border` to an element instead of having to do `border border-gray-500` to make a default border visible.

I also need to make sure that I don't lose *too much* from the Ionic styles because there are lots of style aspects that I rely on for their Web Components. What I need on top of my normal **Angular only** addition of Tailwind is to be able to simulate splitting my Tailwind directives apart in the way recommended by the [Tailwind docs](https://tailwindcss.com/docs/using-with-preprocessors) so that I can ensure the intended specificity is applied to my Tailwind classes compared to those that come from Ionic.

I decided to accomplish this by splitting the compilation of each directive, i.e. `@base`, `@utilities` and `@components` into a separate prebuild step and thus import them into my `global.scss` in the correct relative positions compared to the Ionic imports I was keeping. Something like:

```scss
/*
 * App Global CSS
 * ----------------------------------------------------------------------------
 * Put style rules here that you want to apply globally. These styles are for
 * the entire app and not just one component. Additionally, this file can be
 * used as an entry point to import other CSS/Sass files to be included in the
 * output CSS.
 * For more information on global stylesheets, visit the documentation:
 * https://ionicframework.com/docs/layout/global-stylesheets
 */

/* Core CSS required for Ionic components to work properly */
@import '~@ionic/angular/css/core.css';

/* 
 Use the Tailwind reset instead of the one 
 from Ionic because it sets some required 
 defaults for Tailwind
*/
@import './styles/tailwind/base.css';

/* Basic CSS for apps built with Ionic */
@import '~@ionic/angular/css/structure.css';
@import '~@ionic/angular/css/typography.css';
@import '~@ionic/angular/css/display.css';

@import './styles/tailwind/components.css';

/* Optional CSS utils that can be commented out */
// @import '~@ionic/angular/css/padding.css';
// @import '~@ionic/angular/css/float-elements.css';
// @import '~@ionic/angular/css/text-alignment.css';
// @import '~@ionic/angular/css/text-transformation.css';
// @import '~@ionic/angular/css/flex-utils.css';

@import './styles/tailwind/utilities.css';

// Other normal imports...
@import './styles/abstracts/fonts';
```

Notice that now I don't use the Ionic utilities and I *do use* all of the Tailwind goodness!

### Configuration for ng-tailwindcss

Even though it's not strictly necessary, I decided to keep `ng-tailwindcss` around simply because it provides a nice abstraction on top of the `tailwind` cli. I created the following `package.json` scripts to invoke it **3 separate times**, once each for the Tailwind directives:

```json
"scripts": {
  "tailwind": "yarn tw:base && yarn tw:utilities && yarn tw:components",
  "tailwind:prod": "PURGE_TW=true yarn tailwind",
  "tw:base": "ngtw b -c ng-tailwind/ng-tailwind.base.js",
  "tw:utilities": "ngtw b -c ng-tailwind/ng-tailwind.utilities.js",
  "tw:components": "ngtw b -c ng-tailwind/ng-tailwind.components.js"
}
```

> For reasons of simply not wanting the lines to be quite long in my `package.json` I split the scripts apart into a little namespace `tw:` and then made a pair of "parent" scripts for building everything for development and production (in which purging will be invoked by the Tailwind cli).

You'll notice that each call to `ngtw` in the 3 `tw:` namespaced scripts includes a `-c` flag that points to an `ng-tailwindcss` configuration file. Each of the files looks something like

```js
// For example, the compilation of @base looks like this

module.exports = {
    configJS: './tailwind.config.js',
	sourceCSS: './src/styles/ng-tailwind/base.css',
	outputCSS: './src/styles/tailwind/base.css',
	sass: false,
	purge: false,
};
```

In turn, you'll see that each of these configuration files for `ngtw` points to a css file to compile and a css file to output. I include the **sourceCSS** file in `git` as it pretty much just looks like

```css
// ./src/styles/ng-tailwind/base.css
@tailwind base;
```

I then `git ignore` the compiled files, e.g. `./src/styles/tailwind/base.css`, but it's *these compiled files* which are included in my `global.scss` seen above. This allows me to split the Tailwind css files up just like they would be if `PostCSS` did the compilation, and also ensures that I don't include a massive Tailwind development css file in my repo - woo!

**Adding to the Ionic dev server and production builds**

Since this is all essentially just pre-compiling the css, adding to builds (development and production) is really just a matter of invoking the script before invoking the other build commands - here's what the full `scripts` key in my `package.json` looks like:

```json

"scripts": {
  "start": "yarn tailwind && ionic serve --no-open --lab --external -- --proxy-config proxy.conf.json",
  "tailwind": "yarn tw:base && yarn tw:utilities && yarn tw:components",
  "tailwind:prod": "PURGE_TW=true yarn tailwind",
  "emulate": "yarn clean && yarn tailwind && env-cmd --use-shell \"ionic cordova emulate ios --buildConfig build.json -- -- --storePassword=$KEYSTORE_PASSWORD --password=$KEY_PASSWORD\"",
  "build": "yarn clean && yarn tailwind:prod && env-cmd --use-shell \"ionic cordova build ios --prod --release --device --buildConfig build.json -- -- --storePassword=$KEYSTORE_PASSWORD --password=$KEY_PASSWORD\"",
  "tw:base": "ngtw b -c ng-tailwind/ng-tailwind.base.js",
  "tw:utilities": "ngtw b -c ng-tailwind/ng-tailwind.utilities.js",
  "tw:components": "ngtw b -c ng-tailwind/ng-tailwind.components.js"
}
```

### Unifying Tailwind and Ionic

One other consideration is that you don't want Tailwind to stomp all over the Ionic styles (most likely). You can help this with some careful thought in your `tailwind.config.js`. Here's the one I used in this project:

```js
module.exports = {
	purge: {
		enabled: process.env.PURGE_TW === 'true',
		content: ['./src/**/*.html', './src/**/*.ts'],
	},
	theme: {
		extend: {},
		colors: {
			primary: {
				default: 'var(--ion-color-primary)',
				shade: 'var(--ion-color-primary-shade)',
				tint: 'var(--ion-color-primary-tint)',
			},
			secondary: {
				default: 'var(--ion-color-secondary)',
				shade: 'var(--ion-color-secondary-shade)',
				tint: 'var(--ion-color-secondary-tint)',
			},
			tertiary: {
				default: 'var(--ion-color-tertiary)',
				shade: 'var(--ion-color-tertiary-shade)',
				tint: 'var(--ion-color-tertiary-tint)',
			},
			light: {
				default: 'var(--ion-color-light)',
				shade: 'var(--ion-color-light-shade)',
				tint: 'var(--ion-color-light-tint)',
			},
			medium: {
				default: 'var(--ion-color-medium)',
				shade: 'var(--ion-color-medium-shade)',
				tint: 'var(--ion-color-medium-tint)',
			},
			dark: {
				default: 'var(--ion-color-dark)',
				shade: 'var(--ion-color-dark-shade)',
				tint: 'var(--ion-color-dark-tint)',
			},
			success: {
				default: 'var(--ion-color-success)',
				shade: 'var(--ion-color-success-shade)',
				tint: 'var(--ion-color-success-tint)',
			},
			warning: {
				default: 'var(--ion-color-warning)',
				shade: 'var(--ion-color-warning-shade)',
				tint: 'var(--ion-color-warning-tint)',
			},
			danger: {
				default: 'var(--ion-color-danger)',
				shade: 'var(--ion-color-danger-shade)',
				tint: 'var(--ion-color-danger-tint)',
			},
			step: {
				'50': 'var(--ion-color-step-50)',
				'100': 'var(--ion-color-step-100)',
				'150': 'var(--ion-color-step-150)',
				'200': 'var(--ion-color-step-200)',
				'250': 'var(--ion-color-step-250)',
				'300': 'var(--ion-color-step-300)',
				'350': 'var(--ion-color-step-350)',
				'400': 'var(--ion-color-step-400)',
				'450': 'var(--ion-color-step-450)',
				'500': 'var(--ion-color-step-500)',
				'550': 'var(--ion-color-step-550)',
				'600': 'var(--ion-color-step-600)',
				'650': 'var(--ion-color-step-650)',
				'700': 'var(--ion-color-step-700)',
				'750': 'var(--ion-color-step-750)',
				'800': 'var(--ion-color-step-800)',
				'850': 'var(--ion-color-step-850)',
				'900': 'var(--ion-color-step-900)',
				'950': 'var(--ion-color-step-950)',
			},
		},
	},
	variants: {},
	corePlugins: {
		textOpacity: false,
		backgroundOpacity: false,
	},
	plugins: [],
};

```

You'll notice a few things, like

- I use the Ionic style custom properties instead of the corresponding hex/rgb values and further, I do this while overriding the `colors` key from Tailwind. There was simply no need to compile all of the Tailwind colors when I had a full palette from Ionic, and I could make Ionic's configuration there be a single source of truth.
- I turned **off** the `textOpacity` and `backgroundOpacity` plugins - this is the one real impact of not having the process of "how styles are made" be unified. The color variables I have, due to how you configure styling in Ionic, are either hex codes that are incompatible with CSS `rgba` functions (which is how the color opacity utilities work), or a partial `rgb` value like `255, 255, 255` (but not `rgb(255, 255, 255)`) for white. This *would work* with Tailwind I think, but I decided that I didn't want to declare these types of variables for all of my colors and variations. There's just so many colors to specify variables for in Ionic, and I didn't want to bother for the sake of some translucent text.

### Wrapping up

Overall not that bad right? Once you make the connection that Tailwind compilation isn't some `PostCSS` magic, it becomes clear that the path forward is just to add a bit of automation to the lifecycle of *manually* compiling the css. With this setup, I can change any css and see live reloads and I can even make changes to my `tailwind.config.js` and have the changes live reload too (following a Tailwind compilation which takes a few seconds in dev) since ultimately, you're just including another css file in the *scss* build pipeline which Angular knows quite well how to handle!

I found the augmentation of Ionic with a sprinkle of Tailwind to be well worth the effort of figuring it out, and what's better is I got to nuke a large amount of Ionic css from my bundle and instead include a purgable chunk of only the utilities I care about from Tailwind - give it a shot on your next Ionic Angular project :)

**Cheers!**
