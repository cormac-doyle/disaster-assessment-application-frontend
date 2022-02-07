import { render, screen } from '@testing-library/react';
import App from './App';
import Map from "./components/Map/Map";
import {fetchResponseJson} from './fetchResponseJson'

test('check for title text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Disaster Assesment Application/i);
  expect(linkElement).toBeInTheDocument();
});

test('check if map', () => {
  const { container } = render(<Map />)
  expect(container.childElementCount).toEqual(1);
});

const MOCK_MESSAGE = {"message":"Hello World"}

test('check data has been loaded', async () => {
  fetch = jest.fn(() =>
  Promise.resolve({
      json: () => Promise.resolve(MOCK_MESSAGE),
    })
  );

  const data = await fetchResponseJson('test-url')
  expect(fetch).toBeCalledWith("test-url");
  expect(data).toEqual(MOCK_MESSAGE)

});
