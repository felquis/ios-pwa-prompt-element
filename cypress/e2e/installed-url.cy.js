describe("installed-url attribute", () => {
  beforeEach(() => {
    // Load the page containing the iOS PWA prompt element
    cy.visit({
      url: "http://localhost:3000/tests/installed-url.html",
    });
  });

  it("should have a dialog element with open=false initially", () => {
    // Verify the dialog element inside the iOS PWA prompt element has open=false initially

    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find(".overlay")
      .should("not.have.class", "visible");

    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find("dialog")
      .should("not.be.visible");
  });
});
