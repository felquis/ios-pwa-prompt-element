describe("iOS Safari User Agent", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/tests/custom-element.html", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
      },
      onBeforeLoad(win) {
        // Mock the navigator.userAgent
        Object.defineProperty(win.navigator, "userAgent", {
          value:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
          configurable: true,
        });
      },
    });
  });

  it("should not show the dialog when not iOS or iPadOS user agent", () => {
    // Check that the dialog is not visible on the first visit
    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find(".overlay")
      .should("not.have.class", "visible");
  });
});
