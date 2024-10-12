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

#### NextJS usage

[codesandbox demo](https://codesandbox.io/p/devbox/2thwz9?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522cm25h4n1n00063b6lt3moxp2p%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522cm25h4n1n00023b6l9p22z5f4%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522cm25h4n1n00043b6l24h54m9u%2522%257D%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522cm25h4n1n00053b6lp1cidrvp%2522%257D%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cm25h4n1n00023b6l9p22z5f4%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cm25h4n1m00013b6lswi4p57j%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%255D%252C%2522id%2522%253A%2522cm25h4n1n00023b6l9p22z5f4%2522%252C%2522activeTabId%2522%253A%2522cm25h4n1m00013b6lswi4p57j%2522%257D%252C%2522cm25h4n1n00053b6lp1cidrvp%2522%253A%257B%2522id%2522%253A%2522cm25h4n1n00053b6lp1cidrvp%2522%252C%2522activeTabId%2522%253A%2522cm25hpb5x002b3b6lel4o95kd%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A3000%252C%2522id%2522%253A%2522cm25hpb5x002b3b6lel4o95kd%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%252C%2522cm25h4n1n00043b6l24h54m9u%2522%253A%257B%2522id%2522%253A%2522cm25h4n1n00043b6l24h54m9u%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cm25h4n1n00033b6lb1pd8qyt%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%257D%255D%252C%2522activeTabId%2522%253A%2522cm25h4n1n00033b6lb1pd8qyt%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D) check the `app/ios-pwa-prompt-element.tsx` that uses `'use client'` and`app/page.tsx`that uses`next/dynamic` to import it. It won't work on ssr context.

#### Vue usage

comming soon, will follow the same principle as react above.

## Project Goals

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
