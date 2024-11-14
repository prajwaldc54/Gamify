import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
import { MockTextInput } from 'tests/mocks/MockTextInput';

// Required Variables / Functions
let container: any = null,
  textField: HTMLInputElement,
  plus = '\n+++++++++++++++++++++\n ';

// Test case starts here
describe(`${plus} TextInput Component ${plus}`, () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
    render(<MockTextInput />, container);
  });

  afterEach(() => {
    jest.clearAllTimers();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Correct input on name gives valid result.', async () => {
    textField = screen.getByRole('textbox');
    userEvent.type(textField, 'UdipRai');

    await act(async () => {
      fireEvent.blur(textField);
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument;
  });

  it('Name is required / cannot be blank.', async () => {
    textField = screen.getByRole('textbox');
    // userEvent.type(textField, '');
    fireEvent.focus(textField);
    fireEvent.blur(textField);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText('Name is required')).toBeInTheDocument;
  });

  it('Name must be 3 characters at least.', async () => {
    textField = screen.getByRole('textbox');
    userEvent.type(textField, 'a');
    fireEvent.blur(textField);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText('Name must be at least 3 characters'))
      .toBeInTheDocument;
  });
});
