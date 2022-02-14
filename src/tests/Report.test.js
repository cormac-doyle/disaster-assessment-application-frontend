import { render, screen } from '@testing-library/react';
import Report from '../components/report/Report';
import MapDisaster from "../components/map/MapDisaster";
import { fetchResponseJson } from '../components/home/fetchResponseJson'

test('check if map exists', () => {
    const { container } = render(<MapDisaster />)
    expect(container.childElementCount).toEqual(1);
});

//TODO popup test
// test('check if map exists', () => {
//     const { container } = render(<MapTraffic />)
//     expect(container.childElementCount).toEqual(1);
// });
