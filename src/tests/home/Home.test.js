import { render, screen } from '@testing-library/react';
import Home from '../../components/home/Home';
import GDPRAlert from '../../components/home/Home';
import MapTraffic from "../../components/map/MapTraffic";
import { fetchResponseJson } from '../../components/fetchResponseJson'

test('check if map exists', async () => {
  const { container } = render(<MapTraffic />)
  expect(container.childElementCount).toEqual(1);
});

test('check if GDPR warning is displayed', () => {
  const { getByText } = render(<Home />)
  expect(screen.getByText('Disclaimer')).toBeTruthy();
});


const MOCK_MESSAGE = { "message": "Hello World" }

test('check mock data has been loaded', async () => {
  fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_MESSAGE),
    })
  );

  const data = await fetchResponseJson('test-url')
  expect(fetch).toBeCalledWith("test-url");
  expect(data).toEqual(MOCK_MESSAGE)

});
