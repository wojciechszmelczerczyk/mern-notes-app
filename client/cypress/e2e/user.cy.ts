describe("User login", () => {
  it("if user credentials are incorrect, prompt error", () => {
    cy.visit("http://localhost:5000/login");

    cy.get('[data-cy="emailInput"]').type("user2404gmail.com");

    cy.get('[data-cy="passwordInput"]').type("test404");

    cy.get('[data-cy="userBtn"]').click();

    cy.get("[data-cy='emailError']").should(
      "contain",
      "Please enter a valid email"
    );
  });

  it("if user credentials are correct, redirect to note list page", () => {
    cy.visit("http://localhost:5000/login");

    cy.get('[data-cy="emailInput"]').type("user2@gmail.com");

    cy.get('[data-cy="passwordInput"]').type("test123");

    cy.get('[data-cy="userBtn"]').click();

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/");
    });
  });
});
