import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../components/login/Login';
import { BrowserRouter } from "react-router-dom";

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

    render(<BrowserRouter><Login /></BrowserRouter>);
    const linkElement = screen.getByText(/Disaster_assessment_application/i);

    expect(linkElement).toBeInTheDocument();
});

test('renders the form correctly', () => {

    const { getByText, getByLabelText } = render(<BrowserRouter><Login /></BrowserRouter>);
    const nameLabel = getByText(/EMAIL/i);
    const ageLabel = getByText(/PASSWORD/i);
    expect(nameLabel).toBeInTheDocument();
    expect(ageLabel).toBeInTheDocument();
    const input = getByLabelText(/EMAIL/i);

    expect(input).toHaveAttribute('type', 'email')
});

test('submit button should be disabled when email address is empty', () => {

    const { getByLabelText, getByRole } = render(<BrowserRouter><Login /></BrowserRouter>);
    const input = getByLabelText(/EMAIL/i);
    fireEvent.change(input, { 'target': { 'value': '' } });
    const submitBtn = getByRole('button', { name: 'Submit' });

    expect(submitBtn).toHaveAttribute('disabled');
});
/*
test('submit button exist', () => {
    const submitBtn = getByRole('button', { type="submit" });
    expect(submitBtn).toBeInTheDocument();
})*/