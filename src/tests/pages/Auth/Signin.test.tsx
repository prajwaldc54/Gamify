import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import Signin from 'pages/Auth/Signin';
import { BrowserRouter } from 'react-router-dom';

// Required Variables / Functions
let container: any = null,
  emailField: HTMLInputElement,
  passwordField: HTMLInputElement,
  loginButton: HTMLButtonElement,
  anchorLink: HTMLAnchorElement,
  plus = '\n+++++++++++++++++++++\n';

const userInput = (inputType: HTMLElement, value: string): void =>
  userEvent.type(inputType, value);

// Test begins here
describe(`${plus} SignIn / Login Page ${plus}`, () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>,
      container
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Forgot password must redirect to /forgot-password', () => {
    anchorLink = screen.getByText(/Forgot password?/i);
    userEvent.click(anchorLink);
    expect(window.location.pathname).toBe('/forgot-password');
  });

  it('Create a new account must redirect to /signup', () => {
    anchorLink = screen.getByText(/Create a new account/i);
    userEvent.click(anchorLink);
    expect(window.location.pathname).toBe('/signup');
  });

  it('No error messages on valid inputs before/on submitting.', async () => {
    emailField = screen.getByPlaceholderText(/example@domainname.com/i);
    passwordField = screen.getByPlaceholderText(/Enter your password/i);
    loginButton = screen.getByRole('button');

    userInput(emailField, 'udiprai28@gmail.com');
    userInput(passwordField, 'Password@123');
    userEvent.click(loginButton);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});
