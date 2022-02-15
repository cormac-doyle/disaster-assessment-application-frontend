import { render, screen } from '@testing-library/react';
import Title from '../components/Title';
import { fetchResponseJson } from '../components/home/fetchResponseJson';

//links
const links = [
    { text: 'Disaster Map', location: "/" },
    { text: 'Report a Disaster', location: "/report" },
    { text: 'Emergency Services Login', location: "/login" },
];

test.each(links)("Check if Nav Bar have %s link", (link) => {
    render(<Title />);
    const linkDom = screen.getByText(link.text);

    expect(linkDom).toHaveAttribute("href", link.location);
});

test('Check if have brand and link to home page', () => {
    render(<Title />);

    const brandDom = screen.getByTestId(/brandhome/);

    expect(brandDom).toHaveAttribute("href", "/");
});

test('check for title text', () => {
    render(<Title />);
    const linkElement = screen.getByText(/Disaster Assesment Application/i);
    expect(linkElement).toBeInTheDocument();
});