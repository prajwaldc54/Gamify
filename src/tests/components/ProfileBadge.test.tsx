import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ProfileBadge } from 'components/Common/ProfileBadge';

// Required Variables / Functions
let container: any = null,
  badge: HTMLElement,
  title: string = 'Popular',
  img: string = 'popular0',
  desc: string = 'Earn popular badges by asking questions.',
  plus = '\n+++++++++++++++++++++\n ';

// Test case starts here
describe(`${plus} Sidebar Component ${plus}`, () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
    render(
      <ChakraProvider>
        <ProfileBadge
          title={title}
          img={img}
          desc={desc}
          data-testid="myBadge1"
        />
      </ChakraProvider>,
      container
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Badge with hover effect test ', async () => {
    badge = screen.getByAltText('Popular');
    fireEvent.mouseOver(badge);
    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText('Earn popular badges by asking questions.'))
      .toBeInTheDocumentl;
  });
});
