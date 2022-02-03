import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const domain = "localhost:8000/";

test("renders without crashing", () => {
  render(<App />);
});

//tests for implementation
/*
test('has title', () => {
  render(<App />);
  expect(screen.getByRole('heading')).toHaveTextContent('Disaster Assessment');
});
*/

/*
test('have map link', () => {
  render(<App />);
  expect(screen.getByText('Disaster Map').closest('a')).toHaveAttribute('href', domain + "map");
});
*/

/*
test('have reporting link', () => {
  render(<App />);
  expect(screen.getByText('Report a Disaster').closest('a')).toHaveAttribute('href', domain + "report");
});
*/

/*
test('have login link', () => {
  render(<App />);
  expect(screen.getByText('Login').closest('a')).toHaveAttribute('href', domain + "login");
});
*/

/*
 test("Test theme button toggle", () => {
   render(<App />);
   const buttonEl = screen.getByText(/Current theme/i);
    
   userEvent.click(buttonEl);
   expect(buttonEl).toHaveTextContent(/dark/i);
 });
*/


