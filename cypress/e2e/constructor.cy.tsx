/// <reference types="cypress" />

import { selectors } from '../support/e2e';

describe('burgerConstructor', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshToken');

    cy.fixture('ingredients.json');
    cy.fixture('order.json');
    cy.fixture('user.json');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');

    cy.visit('/');
  });

  it('expect get mocks', () => {
    cy.wait('@getIngredients');
    cy.wait('@user');
  });

  it('expect bun and ingredients are empty', () => {
    cy.get(selectors.constructor).should('contain.text', 'Выберите булки');
    cy.get(selectors.constructor).should('contain.text', 'Выберите начинку');
  });

  it('expect bun is filled after select', () => {
    cy.addIngredient(0, 0);

    cy.get(selectors.constructor).should(
      'contain.text',
      'Краторная булка N-200i'
    );
    cy.get(selectors.constructor).should('not.contain.text', 'Выберите булки');
    cy.get(selectors.constructor).should('contain.text', 'Выберите начинку');
  });

  it('expect ingredients is filled after select', () => {
    cy.addIngredient(1, 0);

    cy.get(selectors.constructor).should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get(selectors.constructor).should(
      'not.contain.text',
      'Выберите начинку'
    );
  });

  it("expect open bun's modal", () => {
    cy.openModal('Краторная булка N-200i');

    cy.get(selectors.modalContainer).should('be.visible');
  });

  it('expect modal is closed after click on close button', () => {
    cy.openModal('Краторная булка N-200i');

    cy.get(selectors.modalContainer).find('button').click();

    cy.get(selectors.modalContainer).should('not.exist');
  });

  it('expect modal is closed after click on Esc', () => {
    cy.openModal('Краторная булка N-200i');

    cy.get('body').type('{esc}');

    cy.get(selectors.modalContainer).should('not.exist');
  });

  it('expect modal is closed after click on overlay', () => {
    cy.openModal('Краторная булка N-200i');

    cy.get(selectors.modalOverlay).click('top', { force: true });

    cy.get(selectors.modalContainer).should('not.exist');
  });

  it('expect user data is filled', () => {
    cy.visit('/profile');
    cy.get(selectors.profileName).should('have.value', 'Irinka');
    cy.get(selectors.profileEmail).should('have.value', 'tymanira@mail.ru');
  });

  it('expect order has been sent', () => {
    cy.addIngredient(0, 0);
    cy.addIngredient(1, 0);
    cy.addIngredient(-1, -1);

    cy.get(selectors.constructor).children().last().find('button').click();

    cy.wait('@order');

    cy.get(selectors.modalContainer).should('be.visible');

    cy.get(selectors.modalContainer)
      .children()
      .last()
      .children()
      .first()
      .should('contain.text', '1');

    cy.get(selectors.modalContainer).find('button').click();

    cy.get(selectors.constructor).should('contain.text', 'Выберите булки');
    cy.get(selectors.constructor).should('contain.text', 'Выберите начинку');
  });
});
