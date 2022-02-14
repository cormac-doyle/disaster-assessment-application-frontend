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

//TODO popup test
test('modal shows the children and a close button', () => {
    // Arrange
    const handleClose = jest.fn()

    // Act
    const { getByText } = render(<ReportDisasterPopUp />)

    getByText.props.position.lng = 123.456;

    getByText.props.position.lat = 123.456;
    // Assert
    expect(getByText('Please select disaster scale and type')).toBeTruthy()

    // Act
    fireEvent.click(getByText(/close/i))

    // Assert
    expect(handleClose).toHaveBeenCalledTimes(1)
})
