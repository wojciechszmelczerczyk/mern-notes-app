describe("empty spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5000/");
    cy.get("input.xxx").type("user404@gmail.com");
    cy.get("input.yyy").type("test404");
    cy.get("button.userBtn").click();
    cy.get("div.zzz").should("contain", "Please enter a valid email");
  });
});
