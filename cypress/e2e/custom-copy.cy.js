describe("copy attributes", () => {
  beforeEach(() => {
    // Load the page containing the iOS PWA prompt element
    cy.visit("http://localhost:3000/tests/custom-copy.html");
  });

  it("should render the custom element with the correct copy", () => {
    // Check that the custom element is visible
    cy.get("ios-pwa-prompt-element").should("have.attr", "is-visible", "true");

    // Check that the title is rendered correctly
    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find(".appTitle")
      .should("contain.text", "this is the title");

    // Check that the subtitle is rendered correctly
    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find(".appSubtitle")
      .should("contain.text", "this is the subtitle");

    // Check that the description is rendered correctly
    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find(".description")
      .should("contain.text", "this is the description");

    // Check that the add to home screen step is rendered correctly
    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find(".home-step")
      .should("contain.text", "Step 1: Add to Home Screen");

    // Check that the share step is rendered correctly
    cy.get("ios-pwa-prompt-element")
      .shadow()
      .find(".share-step")
      .should("contain.text", "Step 2: Share");
  });
});
