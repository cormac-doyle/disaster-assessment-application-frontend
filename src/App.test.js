import { render, screen } from '@testing-library/react';
import App from './App';
import Map from "./components/Map/Map";

test('check for title text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Disaster Assesment Application/i);
  expect(linkElement).toBeInTheDocument();
});

test('check if map', () => {
  const { container } = render(<Map />)
  expect(container.childElementCount).toEqual(1);
});
