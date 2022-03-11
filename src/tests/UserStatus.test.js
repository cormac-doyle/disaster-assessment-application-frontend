import UserStatus from "../components/UserStatus";
import { render, screen } from '@testing-library/react';

test('check user status renders with valid props', () => {
    const { getByText } = render(<UserStatus items={0} />);
    const text = getByText(/UserID identified. Ready To Report/);
    expect(text).toBeInTheDocument();
});

test('check user status renders as loading without invalid', () => {
    const { getByText } = render(<UserStatus items={""} />);
    const text = getByText(/User ID: Loading.../);
    expect(text).toBeInTheDocument();
});