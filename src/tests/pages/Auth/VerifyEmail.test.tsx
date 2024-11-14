import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VerifyEmail } from 'pages/Auth/VerifyEmail';
import { Provider } from 'react-redux';
import { store } from '../../../stores/index';
import { BrowserRouter } from 'react-router-dom';

let verifyField: HTMLInputElement, submitButton: HTMLButtonElement;

const inputValue = (inputType: HTMLInputElement, value: string): void => {
  userEvent.type(inputType, value);
};

describe('Verify email page tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <VerifyEmail />
        </Provider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
  it('checks if error is shown when no code is entered', async () => {
    verifyField = screen.getByLabelText('Verification Code');
    submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText(/Enter code/i)).toBeInTheDocument();
  });

  it('checks if error is shown if characters less than 6 are entered', async () => {
    verifyField = screen.getByLabelText('Verification Code');
    submitButton = screen.getByText('Submit');
    inputValue(verifyField, '1234');
    userEvent.click(submitButton);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText(/Enter valid code/i)).toBeInTheDocument();
  });

  it('checks if we can type more than 6 characters', async () => {
    verifyField = screen.getByLabelText('Verification Code');
    submitButton = screen.getByText('Submit');
    inputValue(verifyField, '1234567');
    userEvent.click(submitButton);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(verifyField.value).toEqual('123456');
  });
});
