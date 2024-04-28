import { render, screen, fireEvent } from '@testing-library/react';
import RegisterEvent from './RegisterEvent';
import { BrowserRouter } from 'react-router-dom';
import Homepage from './Homepage';
import userEvent from '@testing-library/user-event';
// use react testing library 


describe('Homepage', () => {
    test('displays event cards correctly', () => {
      render(
        <BrowserRouter>
          <Homepage />
        </BrowserRouter>
      );
  
      const eventNames = screen.getAllByRole('heading', { name: /event/i });
      const clubNames = screen.getAllByText(/clubname/i);
      const descriptions = screen.getAllByText(/description/i);
  
      // 4 events in state for right now 
      expect(eventNames.length).toBe(4); 
      expect(clubNames.length).toBe(4);
      expect(descriptions.length).toBe(4);
    });
    
  test('modal opens with correct content when event card is clicked', async () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    // see more button opens modal, so stoe that first 
    const seeMoreButtons = screen.getAllByRole('button', { name: /see more/i });
    userEvent.click(seeMoreButtons[0]); // click the see more button 

    const modalTitle = await screen.findByRole('heading', { name: /eventname/i }); // check that event name pops up in modal 
    expect(modalTitle).toBeInTheDocument();

  });
});
