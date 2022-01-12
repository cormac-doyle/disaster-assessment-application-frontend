import { render, screen } from '@testing-library/react';
import App from './App';

test('check for hello world text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});
