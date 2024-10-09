describe("times-to-show attribute", () => {
  beforeEach(() => {
    // Load the page containing the iOS PWA prompt element
    cy.visit("http://localhost:3000/tests/times-to-show.html");
  });

  it("it should show on the first and second visit, but not the third", () => {
    // Check that the dialog is not visible on the first visit
    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find(".overlay")
      .should("have.class", "visible");

    cy.reload();

    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find(".overlay")
      .should("have.class", "visible");

    cy.reload();
    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find(".overlay")
      .should("not.have.class", "visible");
  });
});
