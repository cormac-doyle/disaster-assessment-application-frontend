import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Verify from '../../components/emergencyServices/emergencyServices';

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => { }),
            },
        };
    },
}));

test('check for title text', () => {

    render(<BrowserRouter><Verify /></BrowserRouter>);
    const linkElement = screen.getByText(/Verify a Disaster/i);

    expect(linkElement).toBeInTheDocument();
});