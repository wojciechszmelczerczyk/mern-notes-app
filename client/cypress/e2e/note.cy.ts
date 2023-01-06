import { tooLongTitle, tooShortTitle } from "../fixtures/note.json";

describe("Create note", () => {
  beforeEach(() => {
    localStorage.setItem(
      "at",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWY5OWVhNGRhODYzMGIwYWNjYWI5YyIsImlhdCI6MTY3MjY1NTM3OSwiZXhwIjoxNjcyNjU2Mjc5fQ.EV3kYep5HPRNnK_X9a8GJ3N1byVSF625Fzig_ug5whQ"
    );
  });

  it("if note title is too short, prompt an error", () => {
    cy.createNote(tooShortTitle);

    cy.get('[data-cy="createNoteError"]').should(
      "contain",
      "Note title is too short."
    );
  });

  it("if note title is too long, prompt an error", () => {
    cy.createNote(tooLongTitle);

    cy.get('[data-cy="createNoteError"]').should(
      "contain",
      "Note title is too long."
    );
  });
});
