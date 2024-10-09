describe("delay attribute", () => {
  beforeEach(() => {
    // Load the page containing the iOS PWA prompt element
    cy.visit("http://localhost:3000/tests/delay-1000.html");
  });

  it("should not show the dialog on the first visit", () => {
    // Check that the dialog is not visible on the first visit
    cy.get("ios-pwa-prompt")
      .shadow()
      .find(".overlay")
      .should("not.have.class", "visible");
  });

  it("should show the dialog after the specified delay on the first visit", () => {
    // Check that the dialog is not immediately visible
    cy.get("ios-pwa-prompt")
      .shadow()
      .find(".overlay")
      .should("not.have.class", "visible");

    // Wait for the specified delay
    cy.wait(1050);

    // Check that the dialog becomes visible after the delay
    cy.get("ios-pwa-prompt")
      .shadow()
      .find(".overlay")
      .should("have.class", "visible");
  });

  it("should close the dialog when clicking on the overlay", () => {
    // Wait for the specified delay to ensure the dialog is visible
    cy.wait(1050);

    // Check that the dialog is visible
    cy.get("ios-pwa-prompt")
      .shadow()
      .find(".overlay")
      .should("have.class", "visible");

    // Simulate clicking on the overlay to close the dialog
    cy.get("ios-pwa-prompt").shadow().find(".overlay").click();

    // Verify the dialog is no longer visible
    cy.get("ios-pwa-prompt")
      .shadow()
      .find(".overlay")
      .should("not.have.class", "visible");
  });

  it("should close the dialog when clicking on the close button", () => {
    // Wait for the specified delay to ensure the dialog is visible
    cy.wait(1050);

    // Check that the dialog is visible
    cy.get("ios-pwa-prompt")
      .shadow()
      .find(".overlay")
      .should("have.class", "visible");

    // Simulate clicking on the close button to close the dialog
    cy.get("ios-pwa-prompt").shadow().find(".closeButton").click();

    // Verify the dialog is no longer visible
    cy.get("ios-pwa-prompt")
      .shadow()
      .find(".overlay")
      .should("not.have.class", "visible");
  });
});
