import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PublicNavbar from '../src/pages/Navbar/PublicNavbar';

describe('PublicNavbar', () => {
  test('renders navigation links', () => {
    render(<PublicNavbar />);

    // Check if the navigation links are rendered
    const homeLink = screen.getByText('Home');
    const postsLink = screen.getByText('Posts');
    const loginLink = screen.getByText('Login');
    const registerLink = screen.getByText('Register');

    // Assert that the links are visible
    expect(homeLink).toBeInTheDocument();
    expect(postsLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  test('opens profile panel when menu button is clicked', () => {
    render(<PublicNavbar />);

    // Check if the profile panel is initially hidden
    const profilePanel = screen.queryByRole('dialog');
    expect(profilePanel).not.toBeInTheDocument();

    // Click the menu button to open the profile panel
    const menuButton = screen.getByLabelText('Open main menu');
    fireEvent.click(menuButton);

    // Check if the profile panel is now visible
    const updatedProfilePanel = screen.queryByRole('dialog');
    expect(updatedProfilePanel).toBeInTheDocument();
  });
});
