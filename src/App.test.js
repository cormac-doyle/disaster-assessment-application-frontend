import { render, screen } from '@testing-library/react';
import App from './App';

test('check for loading text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
