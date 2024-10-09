class IosPwaPrompt extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isVisible = false; // Add a state to track visibility
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener("click", (event) => {
      if (event.target.matches(".overlay")) {
        this.isVisible = false; // Immediately update visibility state
        this.setAttribute("is-visible", "false");
        this.render();
      } else if (
        event.target.closest(".closeButton") ||
        event.target.matches(".closeButton")
      ) {
        this.isVisible = false; // Immediately update visibility state
        this.setAttribute("is-visible", "false");
        this.render();
      }
    });

    this.checkPromptOnVisit(); // Check visits on component connection
  }

  checkPromptOnVisit() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const platformRegex = new RegExp("(iphone|ipad|ipod|macintosh)", "g");
    const versionRegex = new RegExp("os (\\d+)", "g");

    const platform = platformRegex.exec(userAgent)?.[1];
    const isIpad =
      platform === "macintosh" && window.navigator.maxTouchPoints > 1;
    const version = versionRegex.exec(userAgent)?.[1];
    const standalone =
      "standalone" in window.navigator && !!window.navigator.standalone;

    const isValidOS = isIpad || !!(platform && platform !== "macintosh");

    if (!isValidOS) {
      this.setAttribute("is-visible", "false");
      return; // Exit if not iOS or iPadOS
    }

    const promptOnVisit = parseInt(this.getAttribute("prompt-on-visit"), 10);
    const timesToShow = parseInt(this.getAttribute("times-to-show"), 10);
    const storageKey = "ios-pwa-prompt-visit-count";
    const visibleCountKey = "ios-pwa-prompt-visible-count";

    if (!isNaN(promptOnVisit)) {
      const visitCount =
        parseInt(localStorage.getItem(storageKey) || "0", 10) + 1;
      localStorage.setItem(storageKey, visitCount);

      if (visitCount >= promptOnVisit) {
        this.setAttribute("is-visible", "true");
      }
    }

    if (!isNaN(timesToShow)) {
      const visibleCount = parseInt(
        localStorage.getItem(visibleCountKey) || "0",
        10
      );
      if (visibleCount < timesToShow) {
        this.setAttribute("is-visible", "true");
        localStorage.setItem(visibleCountKey, visibleCount + 1);
      }
    }
  }

  static get observedAttributes() {
    return [
      "app-icon-path",
      "copy-add-to-home-screen-step",
      "copy-description",
      "copy-share-step",
      "copy-subtitle",
      "copy-title",
      "delay",
      "is-shown",
      "on-close",
      "prompt-on-visit",
      "times-to-show",
      "is-visible", // Add new attribute to observe
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "is-visible" && newValue === "true") {
      const delay = parseInt(this.getAttribute("delay"), 10) || 0; // Get delay attribute or default to 0
      if (delay > 0) {
        setTimeout(() => {
          this.isVisible = true; // Update visibility state after delay
          this.render();
          const dialog = this.shadowRoot.querySelector("dialog");
          dialog.show(); // Show the dialog
        }, delay);
      } else {
        this.isVisible = true; // Immediately update visibility state if no delay
        this.render();
        const dialog = this.shadowRoot.querySelector("dialog");
        dialog.show(); // Show the dialog
      }
    } else if (name === "is-visible") {
      this.isVisible = newValue === "true"; // Update visibility state immediately if not true
      if (!this.isVisible) {
        // const dialog = this.shadowRoot.querySelector("dialog");
        // dialog.close(); // Close the dialog
      }
      this.render();
    }
  }

  render() {
    const appIconPath =
      this.getAttribute("app-icon-path") ||
      `https://s2.googleusercontent.com/s2/favicons?domain=${window?.location?.origin}`;
    const copyAddToHomeScreenStep =
      this.getAttribute("copy-add-to-home-screen-step") ||
      "Press 'Add to Home Screen'";
    const copyDescription =
      this.getAttribute("copy-description") ||
      "This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.";
    const copyShareStep =
      this.getAttribute("copy-share-step") ||
      "Press the 'Share' button on the menu bar below";
    const copySubtitle =
      this.getAttribute("copy-subtitle") || String(window?.location?.href);
    const copyTitle = this.getAttribute("copy-title") || "Add to Home Screen";

    const overlayClass = this.isVisible ? "overlay visible" : "overlay"; // Conditionally apply class
    const panelClass = this.isVisible ? "panel visible" : "panel"; // Conditionally apply class

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;

          font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
          line-height: 1.5;
          font-weight: 400;

          color-scheme: light dark;
          color: rgba(255, 255, 255, 0.87);

          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-text-size-adjust: 100%;
          display: block;
          font-family: Arial, sans-serif;
          text-align: center;
          background-color: white;
          border: 1px solid #ccc;
          padding: 16px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          margin: 16px auto;
        }

        .container * {
          font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
          font-smoothing: antialiased;
          -moz-osx-font-smoothing: antialiased;
          -webkit-font-smoothing: antialiased;
        }

        .overlay {
          background-color: rgba(10, 10, 10, 0.5);
          height: 100%;
          left: 0;
          min-height: 100vh;
          min-width: 100vw;
          opacity: 0;
          pointer-events: none;
          position: fixed;
          top: 0;
          touch-action: none;
          transition: opacity 0.2s ease-in;
          width: 100%;
        }

        .visible {
          display: block;
          opacity: 1;
          pointer-events: all;
          touch-action: auto;
          z-index: 999999;
        }

        @media (prefers-color-scheme: light) {
          .overlay {
            background-color: rgba(10, 10, 10, 0.2);
          }
        }

        .panel {
          background-color: #222222;
          border-radius: 13px 13px 0 0;
          bottom: 0;
          box-sizing: border-box;
          left: 0;
          overflow: hidden;
          position: fixed;
          transform: translateY(calc(100% + 10px));
          transition: transform 0.4s cubic-bezier(0.4, 0.24, 0.3, 1);
          width: 100%;
          box-shadow: 0 0px 100px rgba(0, 0, 0, 0.23), 0 0px 100px rgba(0, 0, 0, 0.23);
          z-index: 999999;
        }

        .panel.visible {
          display: block;
          transform: translateY(0);
        }

        @media (prefers-color-scheme: light) {
          .panel {
            background-color: #f6f6f6;
          }
        }

        .header {
          display: flex;
          justify-content: space-between;
          padding: 15px;
        }

        .header * {
          margin: 0;
          padding: 0;
        }

        .appInfo {
          display: flex;
          flex-flow: row nowrap;
        }

        .appIcon {
          border-radius: 7.5px;
          height: 60px;
          min-height: 60px;
          min-width: 60px;
          overflow: hidden;
          width: 60px;
        }

        .appTitleContainer {
          align-items: flex-start;
          display: flex;
          flex-flow: column nowrap;
          gap: 4px;
          justify-content: flex-start;
          padding: 4px 15px;
          text-align: left;
        }

        .appTitle {
          color: rgba(255, 255, 255, 100%);
          font-size: 16px;
          font-weight: 600;
          line-height: 20px;
        }

        .appSubtitle {
          color: rgba(235, 235, 245, 60%);
          font-size: 14px;
          font-weight: 300;
          line-height: 20px;
        }

        @media (prefers-color-scheme: light) {
          .appTitle {
            color: #000000;
          }

          .appSubtitle {
            color: rgba(60, 60, 67, 60%);
          }
        }

        /* divider */
        .divider {
          background-color: rgba(84, 84, 88, 65%);
          height: 1px;
          transform: scaleY(0.2);
          width: 100%;
        }

        /* description */
        .description {
          color: rgba(235, 235, 245, 60%);
          font-size: 14px;
          font-weight: 300;
          line-height: 20px;
          padding: 20px 30px;
          text-align: left;
        }

        @media (prefers-color-scheme: light) {
          .description {
            color: rgba(60, 60, 67, 60%);
          }
        }

        @media (prefers-color-scheme: light) {
          .divider {
            color: rgba(60, 60, 67, 36%);
          }
        }

        /* list */
        .list {
          list-style-type: none;
          list-style: inside decimal;
          margin: 0;
          padding: 20px 30px;
        }

        img {
          max-width: 100%;
          height: auto;
        }
        h2 {
          font-size: 1.5em;
          margin: 0.5em 0;
        }
        p {
          margin: 0.5em 0;
        }

        /* close icon */
        .close-icon {
          height: 100%;
          border: 0;
        }

        .close-circle {
          fill: #363739;
        }

        .close-cross {
          fill: #a3a4a9;
        }

        @media (prefers-color-scheme: light) {
          .close-circle {
            fill: #dedede;
          }

          .close-cross {
            fill: #807f84;
          }
        }
        
        /* share icon */
        .share-icon {
          color: #0a84ff;
          fill: #0a84ff;
          width: 20px;
        }

        @media (prefers-color-scheme: light) {
          .share-icon {
            color: #007aff;
            fill: #007aff;
          }
        }

        /* add to homescreen icon */
        .home-icon {
          color: white;
          fill: white;
          width: 20px;
        }

        @media (prefers-color-scheme: light) {
          .home-icon {
            color: #007aff;
            fill: #007aff;
          }
        }

        /* step item */
        .stepItem {
          align-items: center;
          display: flex;
          font-size: 14px;
          font-weight: 300;
          justify-content: flex-start;
          line-height: 20px;
          margin: 15px 0;
          width: 100%;
        }

        .stepItem:first-of-type {
          margin-top: 0;
        }

        .stepItem:last-of-type {
          margin-bottom: 0;
        }

        .copy {
          margin: 0 0 0 30px;
          text-align: left;
          color: rgba(235, 235, 245, 60%);
        }

        /* close button */
        .closeButton {
          cursor: pointer;
          align-items: center;
          background: none;
          border-radius: 30px;
          border: 0;
          display: block;
          display: flex;
          height: 30px;
          justify-content: center;
          width: 30px;
          color: rgba(235, 235, 245, 60%);
        }

        @media (prefers-color-scheme: light) {
          .copy {
            color: rgba(60, 60, 67, 60%);
          }
        }
      </style>
      <dialog open="${this.isVisible}">
        <div class="container">
          <div class="${overlayClass}" aria-label="Close" role="button"></div>
          <div aria-describedby="pwa-prompt-description" aria-labelledby="pwa-prompt-title" role="dialog" class="${panelClass}">
            <!-- New Header JSX -->
            <div class="header iOSPWA-header">
              <div class="appInfo">
                <img class="appIcon" src="${appIconPath}" alt="App Icon" />
                <div class="appTitleContainer">
                  <span class="appTitle">${copyTitle}</span>
                  <span class="appSubtitle">${copySubtitle}</span>
                </div>
              </div>
              <!-- Assuming you have a close button logic similar to the React component -->
              <button class="closeButton" aria-label="Close" role="button">
                <svg viewBox="0 0 30.249 29.8975" class="close-icon">
                  <path
                    class="close-circle"
                    d="M14.9414 29.8828C23.1885 29.8828 29.8828 23.1738 29.8828 14.9414C29.8828 6.69434 23.1885 0 14.9414 0C6.70898 0 0 6.69434 0 14.9414C0 23.1738 6.70898 29.8828 14.9414 29.8828Z"
                  />
                  <path
                    class="close-cross"
                    d="M10.0195 21.0938C9.3457 21.0938 8.81836 20.5518 8.81836 19.8779C8.81836 19.5557 8.93555 19.248 9.16992 19.0283L13.2275 14.9561L9.16992 10.8984C8.93555 10.6641 8.81836 10.3711 8.81836 10.0488C8.81836 9.36035 9.3457 8.84766 10.0195 8.84766C10.3564 8.84766 10.6201 8.96484 10.8545 9.18457L14.9414 13.2568L19.0576 9.16992C19.3066 8.9209 19.5703 8.81836 19.8926 8.81836C20.5664 8.81836 21.1084 9.3457 21.1084 10.0195C21.1084 10.3564 21.0059 10.6201 20.7422 10.8838L16.6699 14.9561L20.7275 19.0137C20.9766 19.2334 21.0938 19.541 21.0938 19.8779C21.0938 20.5518 20.5518 21.0938 19.8633 21.0938C19.5264 21.0938 19.2188 20.9766 18.999 20.7422L14.9414 16.6699L10.8984 20.7422C10.6641 20.9766 10.3564 21.0938 10.0195 21.0938Z"
                  />
                </svg>
              </button>
            </div>

            <div class="divider"></div>
            
            <div class="description">
              ${copyDescription}
            </div>
            <div class="divider"></div>

            <ol class="list">
              <li class="stepItem">
                <svg viewBox="0 0 17.6953 26.0059" class="share-icon">
                  <path d="M17.334 10.8105L17.334 20.4395C17.334 22.4512 16.3086 23.4668 14.2676 23.4668L3.06641 23.4668C1.02539 23.4668 0 22.4609 0 20.4395L0 10.8105C0 8.78906 1.02539 7.7832 3.06641 7.7832L6.05469 7.7832L6.05469 9.35547L3.08594 9.35547C2.10938 9.35547 1.57227 9.87305 1.57227 10.8887L1.57227 20.3613C1.57227 21.377 2.10938 21.8945 3.08594 21.8945L14.2383 21.8945C15.2051 21.8945 15.7617 21.377 15.7617 20.3613L15.7617 10.8887C15.7617 9.87305 15.2051 9.35547 14.2383 9.35547L11.2695 9.35547L11.2695 7.7832L14.2676 7.7832C16.3086 7.7832 17.334 8.79883 17.334 10.8105Z" />
                  <path d="M8.66211 15.8203C9.08203 15.8203 9.44336 15.4785 9.44336 15.0684L9.44336 5.13672L9.38477 3.68164L9.93164 4.25781L11.4355 5.86914C11.5723 6.02539 11.7773 6.10352 11.9629 6.10352C12.373 6.10352 12.6758 5.81055 12.6758 5.41992C12.6758 5.20508 12.5977 5.04883 12.4512 4.90234L9.22852 1.79688C9.0332 1.60156 8.86719 1.54297 8.66211 1.54297C8.4668 1.54297 8.30078 1.60156 8.0957 1.79688L4.88281 4.90234C4.73633 5.04883 4.64844 5.20508 4.64844 5.41992C4.64844 5.81055 4.94141 6.10352 5.35156 6.10352C5.53711 6.10352 5.75195 6.02539 5.88867 5.86914L7.40234 4.25781L7.94922 3.68164L7.89062 5.13672L7.89062 15.0684C7.89062 15.4785 8.24219 15.8203 8.66211 15.8203Z" />
                </svg>

                <p class="copy share-step">${copyShareStep}</p>
              </li>

              <li class="stepItem">
                <svg viewBox="0 0 18.3398 17.9785" class="home-icon">
                  <path d="M3.06641 17.9785L14.9121 17.9785C16.9629 17.9785 17.9785 16.9727 17.9785 14.9609L17.9785 3.02734C17.9785 1.01562 16.9629 0 14.9121 0L3.06641 0C1.02539 0 0 1.01562 0 3.02734L0 14.9609C0 16.9727 1.02539 17.9785 3.06641 17.9785ZM3.08594 16.4062C2.10938 16.4062 1.57227 15.8887 1.57227 14.873L1.57227 3.11523C1.57227 2.09961 2.10938 1.57227 3.08594 1.57227L14.8926 1.57227C15.8594 1.57227 16.4062 2.09961 16.4062 3.11523L16.4062 14.873C16.4062 15.8887 15.8594 16.4062 14.8926 16.4062Z" />
                  <path d="M4.47266 8.98438C4.47266 9.46289 4.80469 9.78516 5.30273 9.78516L8.17383 9.78516L8.17383 12.666C8.17383 13.1543 8.50586 13.4961 8.98438 13.4961C9.47266 13.4961 9.81445 13.1641 9.81445 12.666L9.81445 9.78516L12.6953 9.78516C13.1836 9.78516 13.5254 9.46289 13.5254 8.98438C13.5254 8.49609 13.1836 8.1543 12.6953 8.1543L9.81445 8.1543L9.81445 5.2832C9.81445 4.78516 9.47266 4.44336 8.98438 4.44336C8.50586 4.44336 8.17383 4.78516 8.17383 5.2832L8.17383 8.1543L5.30273 8.1543C4.80469 8.1543 4.47266 8.49609 4.47266 8.98438Z" />
                </svg>

                <p class="copy home-step">${copyAddToHomeScreenStep}</p>
              </li>
            </ol>
          </div>
        </div>
      </dialog>
    `;
  }
}

customElements.define("ios-pwa-prompt", IosPwaPrompt);
