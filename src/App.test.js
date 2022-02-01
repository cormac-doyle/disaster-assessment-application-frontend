import { render, screen } from '@testing-library/react';
import App from './App';
import {fetchResponseJson} from './fetchResponseJson'


test('check for loading text', () => {
  render(<App />);
  const loadingElement = screen.getByText("Loading...");
  expect(loadingElement).toBeInTheDocument();
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


