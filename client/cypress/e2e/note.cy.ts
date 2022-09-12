import { tooLongTitle, tooShortTitle } from "../fixtures/note.json";

describe("Create note", () => {
  beforeEach(() => {
    localStorage.setItem(
      "at",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDhhMGJiNTczYjkyYzkyODYxMzgwYiIsImlhdCI6MTY2MjgxMTM2M30._v2W5haKOBtBtfW2qqfmQRRiQBObo1QZGTgCqShUzSA"
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
