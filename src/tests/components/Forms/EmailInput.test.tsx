import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from 'components/Forms/TextInput';
import { useFormik } from 'formik';
import { textFormik } from 'tests/utils/textFormik';
import { unmountComponentAtNode } from 'react-dom';
import { MockEmailInput } from 'tests/mocks/MockEmailInput';

// Required Variables / Functions
let container: any = null,
  emailField: HTMLInputElement,
  placeholder = 'example@domainname.com',
  plus = '\n+++++++++++++++++++++\n ';

// Test case starts here
describe(`${plus} EmailInput Component ${plus}`, () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
    render(<MockEmailInput />, container);
  });

  afterEach(() => {
    jest.clearAllTimers();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Correct input on email gives valid result.', async () => {
    emailField = screen.getByPlaceholderText(placeholder);
    userEvent.type(emailField, 'udiprai28@gmail.com');
    fireEvent.blur(emailField);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('Email is required / cannot be blank.', async () => {
    emailField = screen.getByPlaceholderText(placeholder);
    fireEvent.focus(emailField);
    fireEvent.blur(emailField);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText('Email is required')).toBeInTheDocument;
  });

  it('Invalid email will throw an error.', async () => {
    emailField = screen.getByPlaceholderText(placeholder);
    userEvent.type(emailField, 'a');
    fireEvent.blur(emailField);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText('Email is invalid')).toBeInTheDocument;
  });
});
