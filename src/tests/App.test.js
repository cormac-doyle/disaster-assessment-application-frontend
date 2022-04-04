import { render, screen } from '@testing-library/react';
import App from '../App';

// test
test('app renders', () => {
    render(<App />);
    const brandDom = screen.getByTestId(/brandhome/);
    expect(brandDom).toHaveAttribute("href", "/");
});