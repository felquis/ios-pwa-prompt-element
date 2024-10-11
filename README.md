# iOS PWA Prompt Element

## Demo

The demo page is built to work as an interactive documentation, change the parameters, reset localStorage and reload the page to see how it works.

[Demo Link](https://felquis.github.io/ios-pwa-prompt-element/)

## Usage

You can easily load the library from a CDN:

try [jsdelivr.com](https://jsdelivr.com/) CDN

```html
<script src="https://cdn.jsdelivr.net/npm/ios-pwa-prompt-element@0.0.1/dist/bundle.js"></script>
```

try [unpkg.com](https://unpkg.com/) CDN

```html
<script src="https://unpkg.com/ios-pwa-prompt-element@0.0.1/dist/bundle.js"></script>
```

or npm directly

```bash
npm install ios-pwa-prompt-element
```

then import globally, the custom element will be automatically registered:

```
import 'ios-pwa-prompt-element'
```

Then, add the custom element once anywhere in your HTML:

```html
<ios-pwa-prompt-element
  is-visible="true"
  delay="1000"
  prompt-on-visit="1"
  times-to-show="1"
  installed-url="your-url"
  copy-title="custom title"
  copy-subtitle="custom subtitle"
  copy-description="custom description"
  copy-add-to-home-screen-step="Step 1: custom step text"
  copy-share-step="Step 2: custom step text"
></ios-pwa-prompt-element>
```

### Project Goals

🎯 **Identify Gaps**: vanilla HTML custom element with zero dependencies.

🔧 **Implementation**: port to address the need for a lightweight solution.

✅ **Thorough Testing**: extensive testing using Cypress to ensure reliability.

📦 **Publication**: easy to distribute via CDN scripts or npm package import

### Attributes Configuration

| Attribute                      | Description                                     | Default                                                                                                     |
| ------------------------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `is-visible`                   | Controls the visibility of the prompt           | "true"                                                                                                      |
| `delay`                        | Delay in milliseconds before showing the prompt | 1000                                                                                                        |
| `prompt-on-visit`              | Number of visits before showing the prompt      | 1                                                                                                           |
| `times-to-show`                | Maximum number of times to show the prompt      | 1                                                                                                           |
| `installed-url`                | If in location.href, hides the prompt           | undefined                                                                                                   |
| `app-icon-path`                | Path to the app icon image                      | Website favicon or `https://s2.googleusercontent.com/s2/favicons?domain=${window?.location?.origin}`        |
| `copy-add-to-home-screen-step` | Text for the "Add to Home Screen" step          | "Press 'Add to Home Screen'"                                                                                |
| `copy-description`             | Description text for the prompt                 | "This website has app functionality. Add it to your home screen to use it in fullscreen and while offline." |
| `copy-share-step`              | Text for the "Share" step                       | "Press the 'Share' button on the menu bar below"                                                            |
| `copy-subtitle`                | Subtitle text (usually the website URL)         | `window?.location?.href`                                                                                    |
| `copy-title`                   | Title text for the prompt                       | "Add to Home Screen"                                                                                        |

## Motivation

### Background

The development of the iOS PWA prompt can be traced through several significant contributions:

- **Initial Appearance**: The concept first surfaced on GitHub with [pwaPrompt](https://github.com/samvimes01/pwaPrompt?tab=readme-ov-file), which includes an article detailing the necessary checks to display a custom prompt that iOS does not provide. You can read more about it in [this Medium article](https://medium.com/@oleksandr_k/a-way-to-show-a-prompt-to-install-your-angular-pwa-both-on-android-and-ios-devices-7a770f55c54).
- **Notable Implementations**:

  - The most popular implementation is the [react-ios-pwa-prompt](https://github.com/chrisdancee/react-ios-pwa-prompt), which inspired various forks and adaptations:
    - [react-ios-pwa-prompt-ts](https://github.com/thenick775/react-ios-pwa-prompt-ts): A TypeScript version with additional props and Storybook support.
    - [vue2-ios-pwa-prompt](https://github.com/acepoblete/vue2-ios-pwa-prompt): A Vue 2 adaptation.
    - [svelte-ios-pwa-prompt](https://github.com/edrichhans/svelte-ios-pwa-prompt): A port for Svelte.
    - [vue-ios-pwa-prompt](https://github.com/jayplin/vue-ios-pwa-prompt): A port for Vue 3.

- **Other Resources**:
  - Research related to the optimal timing for displaying prompts can be found in the [iOS-friendly service worker repository](https://github.com/webzep/ios-friendly-serviceworker/tree/master).
