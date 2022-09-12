import {
  email,
  password,
  incorrectEmail,
  incorrectPassword,
} from "../fixtures/user.json";

describe("User login", () => {
  it("if user credentials are incorrect, prompt error", () => {
    cy.login(incorrectEmail, incorrectPassword);

    cy.get("[data-cy='emailError']").should(
      "contain",
      "Please enter a valid email"
    );
  });

  it("if user credentials are correct, redirect to note list page", () => {
    cy.login(email, password);

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/");
    });
  });
});
