import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import userEvent from '@testing-library/user-event';
import ForgetPassword from 'pages/Auth/ForgetPassword';
import { BrowserRouter } from 'react-router-dom';

// Required Variables / Functions
let container: any = null,
  emailField: HTMLInputElement,
  sendButton: HTMLButtonElement,
  anchorLink: HTMLAnchorElement,
  plus = '\n+++++++++++++++++++++\n';

// Test begins here
describe(`${plus} ForgetPassword Page ${plus}`, () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
    render(
      <BrowserRouter>
        <ForgetPassword />
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

  it('Login here must redirect to /login', () => {
    anchorLink = screen.getByText(/Login here/i);
    userEvent.click(anchorLink);
    expect(window.location.pathname).toBe('/login');
  });

  it('No error messages on valid email before/on submitting.', async () => {
    emailField = screen.getByPlaceholderText(/example@domainname.com/i);
    sendButton = screen.getByRole('button');

    userEvent.type(emailField, 'udiprai28@gmail.com');
    userEvent.click(sendButton);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});
