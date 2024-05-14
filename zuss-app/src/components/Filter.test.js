import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';  // For more advanced interactions
import Filter from './Filter';

const mockSetData = jest.fn();

const mockAllOrganizations = ['WUEC', 'Kite and Key', 'Spark'];

describe('Filter Component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Filter setData={mockSetData} allOrganizations={mockAllOrganizations} />);
  });

  test('renders event name input', () => {
    const eventNameInput = screen.getByLabelText(/event name/i);
    expect(eventNameInput).toBeInTheDocument();
  });

  test('renders organizations input', () => {
    const organizationsInput = screen.getByLabelText(/organization/i);
    expect(organizationsInput).toBeInTheDocument();
  });

  test('allows user to type in event name input', () => {
    const eventNameInput = screen.getByLabelText(/event name/i);
    
    fireEvent.change(eventNameInput, { target: { value: 'Test Event' } });
    expect(eventNameInput.value).toBe('Test Event');
  });
  

  test('allows user to select multiple organizations', async () => {
    const organizationsInput = screen.getByLabelText(/organization/i);
    fireEvent.mouseDown(organizationsInput);
    const listbox = await screen.findByRole('listbox');
    const options = within(listbox).getAllByRole('option');
    userEvent.click(options[0]);
    userEvent.click(options[1]);
    expect(screen.getByText('WUEC')).toBeInTheDocument();
    expect(screen.getByText('Kite and Key')).toBeInTheDocument();
  });

});
