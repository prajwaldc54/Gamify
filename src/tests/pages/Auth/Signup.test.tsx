import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from 'pages/Auth/Signup';
import { unmountComponentAtNode } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../stores/index';

// Required Variables / Functions
let container: any = null,
  emailField: HTMLInputElement,
  nameField: HTMLInputElement,
  passwordField: HTMLInputElement,
  confirmField: HTMLInputElement,
  checkboxField: HTMLInputElement,
  signupButton: HTMLButtonElement,
  plus = '\n+++++++++++++++++++++\n';

// User will type stuff in inputs
const inputValue = (inputType: HTMLInputElement, value: string): void => {
  userEvent.type(inputType, value);
};

// Test begins here
describe(`${plus} Sign up/Register Page ${plus}`, () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Signup />
        </Provider>
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

  it('Check if password & confirm_password are the same.', async () => {
    passwordField = screen.getByLabelText('Password');
    confirmField = screen.getByLabelText(/Confirm Password/i);

    inputValue(passwordField, 'Password@123');
    inputValue(confirmField, 'someText@73f3');
    fireEvent.blur(confirmField);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText('Passwords must match')).toBeInTheDocument;
  });

  it('Throws an error if one of the fields are empty.', async () => {
    signupButton = screen.getByText('Sign Up');
    userEvent.click(signupButton);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getAllByTestId('error-message')).toBeVisible;
  });

  it('No error messages on valid inputs before/on submitting.', async () => {
    emailField = screen.getByPlaceholderText(/example@domainname.com/i);
    nameField = screen.getByPlaceholderText(/Barly Vallendito/i);
    passwordField = screen.getByLabelText('Password');
    confirmField = screen.getByLabelText(/Confirm Password/i);
    checkboxField = screen.getByRole('checkbox');

    inputValue(emailField, 'udiprai28@gmail.com');
    inputValue(nameField, 'Udip Rai');
    inputValue(passwordField, 'Password@123');
    inputValue(confirmField, 'Password@123');
    userEvent.click(checkboxField);
    userEvent.click(screen.getByText('Sign Up'));

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});
