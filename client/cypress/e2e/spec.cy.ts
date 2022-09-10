describe("Login Component", () => {
  it("if user credentials are incorrect, prompt error", () => {
    cy.visit("http://localhost:5000/login");
    cy.get("input.xxx").type("user2404gmail.com");
    cy.get("input.yyy").type("test404");
    cy.get("button.userBtn").click();
    cy.get("div.zzz").should("contain", "Please enter a valid email");
  });

  it("if user credentials are correct, redirect to note list page", () => {
    cy.visit("http://localhost:5000/login");
    cy.get("input.xxx").type("user2@gmail.com");
    cy.get("input.yyy").type("test123");
    cy.get("button.userBtn").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/");
    });
  });
});

describe("CreateNote Component", () => {
  it("if note title is too short, prompt an error", () => {
    localStorage.setItem("at", "");
    cy.visit("http://localhost:5000/createNote");
    cy.get("input.noteTitleInput").type("tes");
    cy.get("button.createNoteButton").click();
    cy.get("div.createNoteError").should("contain", "Note title is too short.");
  });
  it("if note title is too long, prompt an error", () => {
    localStorage.setItem("at", "");
    cy.visit("http://localhost:5000/createNote");
    cy.get("input.noteTitleInput").type("testtest1");
    cy.get("button.createNoteButton").click();
    cy.get("div.createNoteError").should("contain", "Note title is too long.");
  });
});
