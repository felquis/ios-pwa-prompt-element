describe("app-icon-path attribute", () => {
  beforeEach(() => {
    // Load the page containing the iOS PWA prompt element
    cy.visit("http://localhost:3000/tests/app-icon-path.html");
  });

  it("should render the custom element with the correct app-icon-path", () => {
    // Check that the custom element is visible
    cy.get("ios-pwa-prompt").should("have.attr", "is-visible", "true");

    // Check that the app-icon-path is set correctly
    cy.get("ios-pwa-prompt").should(
      "have.attr",
      "app-icon-path",
      "/custom-image-pathname.png"
    );
  });

  // Add more tests if needed for other attributes or behaviors
});
