
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Homepage from './Homepage';
import { BrowserRouter as Router } from 'react-router-dom';


function renderHomepage() {
  return render(
    <Router>
      <Homepage />
    </Router>
  );
}

describe('Homepage Component', () => {
 
  test('renders Homepage component', () => {
    renderHomepage();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Register Event')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });


  test('displays AppBar with buttons', () => {
    renderHomepage();
    expect(screen.getByText('Register Event')).toBeVisible();
    expect(screen.getByText('Logout')).toBeVisible();
  });


  test('navigates on register event button click', () => {
    const { container } = renderHomepage();
    const registerButton = screen.getByText('Register Event');
    userEvent.click(registerButton);

  });


  test('logout button click removes token and redirects', () => {
    const { container } = renderHomepage();
    const logoutButton = screen.getByText('Logout');
    userEvent.click(logoutButton);

  });


//   test('renders event cards dynamically', async () => {
//     renderHomepage();

//     await waitFor(() => {
//       expect(screen.getByText('Hackathon')).toBeInTheDocument();
//     });
//   });


//   test('modal opens with event details on card click', async () => {
//     renderHomepage();
//     const card = screen.getByText('Hello');
//     userEvent.click(card);
//     await waitFor(() => {
//       expect(screen.getByText('Close')).toBeVisible();
//       expect(screen.getByTestId('modal-modal-description')).toBeVisible();
//     });

    
//     const closeButton = screen.getByText('Close');
//     userEvent.click(closeButton);
//     await waitFor(() => {
//       expect(screen.queryByText('Close')).not.toBeInTheDocument();
//     });
//   });

 });


