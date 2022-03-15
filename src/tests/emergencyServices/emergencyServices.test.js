import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Verify from '../../components/emergencyServices/emergencyServices';

test('check for title text', () => {

    render(<BrowserRouter><Verify /></BrowserRouter>);
    const linkElement = screen.getByText(/Verify a Disaster/i);

    expect(linkElement).toBeInTheDocument();
});