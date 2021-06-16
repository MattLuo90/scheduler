describe("Appointments", () => {
  beforeEach(() => {
    // reset database
    cy.request("GET", "/api/debug/reset");
    // go to home page
    cy.visit("/");
    // find monday
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    //click add button
    cy.get("[alt=Add]")
      .first()
      .click();
    // type name into input field
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    // chooses an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();
    // click save button
    cy.contains("Save")
      .click();
    // check result
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // click add button
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
    // change the name of original booked student and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']")
      .click();
    // save
    cy.contains("Save")
      .click();
    // check result 
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});
