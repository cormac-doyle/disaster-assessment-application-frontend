import { render, screen } from '@testing-library/react';
import Report from '../components/report/Report';
import MapDisaster from "../components/map/MapDisaster";
import ReportDisasterPopUp from "../components/report/ReportDisasterPopUp";
import { Modal } from "react-bootstrap";
import { fetchResponseJson } from '../components/home/fetchResponseJson';

test('check if map exists', () => {
    const { container } = render(<MapDisaster />)
    expect(container.childElementCount).toEqual(1);
});

/*
let MOCK_RESPONSE = JSON.stringify({
    user_id: 0,
    disaster_id: 99,
    scale: 18,
    disaster_type: "fire",
    long: 123.456,
    lat: 123.456,
});

const unmockedFetch = global.fetch

beforeAll(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve(MOCK_RESPONSE),
        })
})

afterAll(() => {
    global.fetch = unmockedFetch
})

test('modal shows the children and a close button', () => {
    // Arrange
    const handleClose = jest.fn()

    // Act
    let position = {
        lng: 123.456,
        lat: 123.456
    }

    render(<ReportDisasterPopUp position={position} />);

    // Assert
    expect(screen.getByText('Disaster Report')).toBeTruthy()
    //const linkElement = screen.getByText(/Disaster Report/i);
    //expect(linkElement).toBeInTheDocument();

    // Act
    fireEvent.click(getByText(/close/i))

    // Assert
    expect(handleClose).toHaveBeenCalledTimes(1)
});
*/
//TODO popup test


