describe("Create note", () => {
  it("if note title is too short, prompt an error", () => {
    localStorage.setItem("at", "");

    cy.visit("http://localhost:5000/createNote");

    cy.get('[data-cy="noteTitleInput"]').type("tes");

    cy.get('[data-cy="createNoteButton"]').click();

    cy.get('[data-cy="createNoteError"]').should(
      "contain",
      "Note title is too short."
    );
  });

  it("if note title is too long, prompt an error", () => {
    localStorage.setItem("at", "");

    cy.visit("http://localhost:5000/createNote");

    cy.get('[data-cy="noteTitleInput"]').type("testtest1");

    cy.get('[data-cy="createNoteButton"]').click();

    cy.get('[data-cy="createNoteError"]').should(
      "contain",
      "Note title is too long."
    );
  });
});
