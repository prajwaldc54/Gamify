import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import userEvent from '@testing-library/user-event';
import CreateTeam from 'pages/Auth/CreateTeam';
import { localStorageMock } from '../../utils/mockStorage';
import { BrowserRouter } from 'react-router-dom';

// Required Variables / Functions
let container: any = null,
  teamName: HTMLInputElement,
  submitButton: HTMLButtonElement,
  placeholder = 'Use your company, department, or own name for inspiration',
  token: string,
  plus = '\n+++++++++++++++++++++\n';

const getPathName = (token: string) =>
  token === 'login_token' ? '/create-team' : '/login';

// Test begins here
describe(`${plus} CreateTeam Page ${plus}`, () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
    render(
      <BrowserRouter>
        <CreateTeam />
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

  it('With token, CreateTeam page is rendered.', () => {
    localStorageMock.setItem('access_token', 'login_token');
    token = localStorageMock.getItem('access_token');
    expect(getPathName(token)).toContain('/create-team');
    localStorageMock.removeItem('access_token');
    localStorageMock.clear();
  });

  it('Without token, Signin/Login page is rendered.', () => {
    expect(getPathName('fake_token')).toContain('/login');
  });

  it('Team name is available for valid inputs before/on submitting.', async () => {
    localStorageMock.setItem('access_token', 'login_token');
    teamName = screen.getByPlaceholderText(placeholder);
    submitButton = screen.getByText('Submit');
    userEvent.type(teamName, 'TeamGold');
    userEvent.click(submitButton);

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument;
  });
});
