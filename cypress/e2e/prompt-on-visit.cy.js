describe("prompt-on-visit attribute", () => {
  beforeEach(() => {
    // Load the page containing the iOS PWA prompt element
    cy.visit("http://localhost:3000/tests/show-on-second-visit.html");
  });

  it("should not show the dialog on the first visit", () => {
    // Check that the dialog is not visible on the first visit
    cy.get("ios-pwa-prompt")
      .shadow()
      .find(".container")
      .should("not.have.class", "visible");
  });

  it("should show the dialog on the second visit", () => {
    // Log the visit count before reload
    cy.window().then((win) => {
      const visitCountBefore = win.localStorage.getItem(
        "ios-pwa-prompt-visit-count"
      );
      console.log(`Visit count before reload: ${visitCountBefore}`); // Use console.log for terminal output
    });

    // Reload the page to simulate a second visit
    cy.reload();

    // Log the visit count after reload
    cy.window().then((win) => {
      const visitCountAfter = win.localStorage.getItem(
        "ios-pwa-prompt-visit-count"
      );
      console.log(`Visit count after reload: ${visitCountAfter}`); // Use console.log for terminal output
    });

    // Check that the dialog is visible on the second visit
    cy.get("ios-pwa-prompt")
      .shadow()
      .find(".overlay")
      .should("have.class", "visible");

    // Check that the dialog is visible on the second visit
    cy.get("ios-pwa-prompt")
      .shadow()
      .find(".panel")
      .should("have.class", "visible");
  });

  it("should close the dialog when clicking on the overlay", () => {
    // Simulate a second visit to ensure the dialog is visible
    cy.reload();

    // Check that the dialog is visible on the second visit
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
    // Simulate a second visit to ensure the dialog is visible
    cy.reload();

    // Check that the dialog is visible on the second visit
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
