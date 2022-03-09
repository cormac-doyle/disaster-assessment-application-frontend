import { getByRole, render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/login/Login';
import { fetchResponseJson } from '../components/fetchResponseJson';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";


test('check for title text', () => {

    render(<BrowserRouter><Login /></BrowserRouter>);
    const linkElement = screen.getByText(/Disaster Assesment Application/i);

    expect(linkElement).toBeInTheDocument();
});

test('renders the form correctly', () => {

    const { getByText, getByLabelText } = render(<BrowserRouter><Login /></BrowserRouter>);
    const nameLabel = getByText(/Email address/i);
    const ageLabel = getByText(/Password/i);
    expect(nameLabel).toBeInTheDocument();
    expect(ageLabel).toBeInTheDocument();
    const input = getByLabelText(/Email address/i);

    expect(input).toHaveAttribute('type', 'email')
});

test('submit button should be disabled when email address is empty', () => {

    const { getByLabelText, getByRole } = render(<BrowserRouter><Login /></BrowserRouter>);
    const input = getByLabelText(/Email address/i);
    fireEvent.change(input, { 'target': { 'value': '' } });
    const submitBtn = getByRole('button', { name: 'Submit' });

    expect(submitBtn).toHaveAttribute('disabled');
});
/*
test('submit button exist', () => {
    const submitBtn = getByRole('button', { type="submit" });
    expect(submitBtn).toBeInTheDocument();
})*/