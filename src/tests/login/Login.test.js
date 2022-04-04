import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../components/login/Login';
import { BrowserRouter } from "react-router-dom";

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

test('submit button exist', () => {
    const { getByRole } = render(<BrowserRouter><Login /></BrowserRouter>);
    const submitBtn = getByRole('button', { name: 'Submit' });
    expect(submitBtn).toBeInTheDocument();
})

test('submit button should be disabled when email address is empty', () => {

    const { getByLabelText, getByRole } = render(<BrowserRouter><Login /></BrowserRouter>);
    const input = getByLabelText(/EMAIL/i);
    fireEvent.change(input, { 'target': { 'value': '' } });
    const submitBtn = getByRole('button', { name: 'Submit' });

    expect(submitBtn).toHaveAttribute('disabled');
});

test('submit button should be enabled when email address is not empty', () => {

    const { getByLabelText, getByRole } = render(<BrowserRouter><Login /></BrowserRouter>);
    const input = getByLabelText(/EMAIL/i);
    fireEvent.change(input, { 'target': { 'value': 'According to all known laws of aviation, there is no way a bee should be able to fly' } });
    const submitBtn = getByRole('button', { name: 'Submit' });

    expect(submitBtn).not.toHaveAttribute('disabled');
});
