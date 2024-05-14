import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Homepage from './Homepage'; 

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [
      { id: 1, name: 'Event 1', description: 'Description 1', image: 'url1', location: 'Location 1', date: 'Date 1', organization: 'Org 1' }
    ]})
  })
);

test('renders Homepage and calls fetch events', async () => {
    render(<Homepage />, { wrapper: BrowserRouter });
    expect(fetch).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByText('Upcoming Events')).toBeInTheDocument());
  });
  
  test('navigates to register event', async () => {
    const { getByText } = render(<Homepage />, { wrapper: BrowserRouter });
    fireEvent.click(getByText('Register Event'));
    expect(mockNavigate).toHaveBeenCalledWith('/register-event');
  });
  
  test('logs out', async () => {
    const { getByText } = render(<Homepage />, { wrapper: BrowserRouter });
    fireEvent.click(getByText('Logout'));
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  