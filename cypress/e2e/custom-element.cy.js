describe("is-visible attribute", () => {
  beforeEach(() => {
    // Load the page containing the iOS PWA prompt element
    cy.visit("http://localhost:3000/tests/custom-element.html");
  });

  it("should render the iOS PWA prompt element", () => {
    // Check if the iOS PWA prompt element is present
    cy.get("ios-pwa-prompt").should("exist");
  });

  it("should have the correct initial visibility state", () => {
    // Verify initial visibility state of the iOS PWA prompt element
    cy.get("ios-pwa-prompt").should("have.attr", "is-visible", "true");
  });

  it("should respond to user interaction", () => {
    // Simulate user interaction and verify the response
    cy.get("ios-pwa-prompt").shadow().find(".overlay").click();
    cy.get("ios-pwa-prompt").should("have.attr", "is-visible", "false");
  });

  it("should close when clicking the close button", () => {
    // Simulate clicking the close button and verify the response
    cy.get("ios-pwa-prompt").shadow().find(".closeButton").click();
    cy.get("ios-pwa-prompt").should("have.attr", "is-visible", "false");
  });
});
