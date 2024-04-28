import { render, screen, fireEvent } from '@testing-library/react';
import RegisterEvent from './RegisterEvent';
import { BrowserRouter } from 'react-router-dom';

// use react testing library 

// ensures that register event component renders without crashing 
// simply check that register event, event name, and organization appear on the UI form to register an event
describe('RegisterEvent Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <RegisterEvent />
      </BrowserRouter>
    );
    expect(screen.getByText('Register Event')).toBeInTheDocument();
    expect(screen.getByLabelText('Event Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Organization')).toBeInTheDocument();
  });
});

// now test INTERACTION ... do we actually see the inputs for the form fields display on 
// the form 
describe('Input Field Interactions', () => {
  test('allows entry in the event name field', () => {
    render(
      <BrowserRouter>
        <RegisterEvent />
      </BrowserRouter>
    );
    // find input field on rendered UI associated with label "event name"
    const eventNameInput = screen.getByLabelText('Event Name');

    // simulate change in the eventNameInput, e.g. like typing in name of event like "new event"
    fireEvent.change(eventNameInput, { target: { value: 'New Event' } });

    // we expect the actual input given to the label to be equal to what we entered 
    expect(eventNameInput.value).toBe('New Event');
  });
});

// test the interaction for organization drop down 
test('allows selection from the organization dropdown', () => {
  render(
    <BrowserRouter>
      <RegisterEvent />
    </BrowserRouter>
  );

  // Find the select dropdown for organization
  const organizationSelect = screen.getByLabelText('Organization');
  
  // Simulate selecting an option from the dropdown
  fireEvent.change(organizationSelect, { target: { value: "Spark" } });

  // Verify that the dropdown's value reflects the user's selection
  expect(organizationSelect.value).toBe('Spark');
});

// test interaction for the date entry field 
test('allows entry in the date field', () => {
  render(
    <BrowserRouter>
      <RegisterEvent />
    </BrowserRouter>
  );

  // Find the date input field
  const dateInput = screen.getByLabelText('Date'); 

  // Simulate typing a date into the date field
  fireEvent.change(dateInput, { target: { value: '2023-04-15' } });

  // Verify that the input field receives the correct date
  expect(dateInput.value).toBe('2023-04-15');
});

// check that submit button works 
describe('Form Submission', () => {
  test('calls the onSubmit when the form is submitted', async () => {
    const handleSubmit = jest.fn();
    render(
      <BrowserRouter>
        <RegisterEvent />
      </BrowserRouter>
    );
    // find the submit button on the screen
    // simulate a click of the buttton
    // expect that handleSubmit is called 
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });
});


