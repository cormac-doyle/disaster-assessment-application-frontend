import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Verify from '../../components/emergencyServices/emergencyServices';

test('check for title text', () => {

    render(<BrowserRouter><Verify /></BrowserRouter>);
    const linkElement = screen.getByText(/VerifyDisaster/i);

    expect(linkElement).toBeInTheDocument();
});