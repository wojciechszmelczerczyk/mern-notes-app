import { tooLongTitle, tooShortTitle } from "../fixtures/note.json";

describe("Create note", () => {
  beforeEach(() => {
    localStorage.setItem("at", process.env.REACT_APP_JWT);
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
