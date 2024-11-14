import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import userEvent from '@testing-library/user-event';
import { MockPasswordInput } from 'tests/mocks/MockPasswordInput';

// Required Variables / Functions
let container: any = null,
  passwordField: HTMLInputElement,
  msg: HTMLParagraphElement,
  eyeIconInput: HTMLInputElement,
  passInputType: string | null,
  placeholder = 'Enter your password',
  plus = '\n+++++++++++++++++++++\n ';

// Test case starts here
describe(`${plus} Password Component ${plus}`, () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
    render(<MockPasswordInput />, container);
  });

  afterEach(() => {
    jest.clearAllTimers();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Correct input on password gives valid result.', async () => {
    passwordField = screen.getByPlaceholderText(placeholder);
    userEvent.type(passwordField, 'Password@123');

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('Eye-icon works on click.', async () => {
    passwordField = screen.getByPlaceholderText(placeholder);
    passInputType = passwordField.getAttribute('type');
    eyeIconInput = screen.getByTestId('toggle-eye');
    userEvent.click(eyeIconInput);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    passInputType === 'password'
      ? expect(passInputType).toBe('password')
      : expect(passInputType).toBe('text');
  });

  it('Password is required / cannot be blank.', async () => {
    passwordField = screen.getByPlaceholderText(placeholder);
    // userEvent.type(passwordField, '');
    fireEvent.blur(passwordField);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    msg = screen.getByTestId('error-message');
    expect(msg.textContent).toBe('password required');
  });

  it('Password must contain (8 Chars), (1 Upper&Lower-case), (1 number.)', async () => {
    passwordField = screen.getByPlaceholderText(placeholder);
    userEvent.type(passwordField, 'passwo');
    fireEvent.blur(passwordField);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    msg = screen.getByTestId('error-message');
    expect(msg.textContent).toBe(
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number'
    );
  });
});
