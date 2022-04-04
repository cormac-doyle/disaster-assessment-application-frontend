import UserStatus from "../components/UserStatus";
import { render } from '@testing-library/react';

test('check user status renders with valid props', () => {
    const { getByText } = render(<UserStatus items={0} />);
    const text = getByText(/user_id_available/);
    expect(text).toBeInTheDocument();
});

test('check user status renders as loading without invalid', () => {
    const { getByText } = render(<UserStatus items={""} />);
    const text = getByText(/user_id_unavailable/);
    expect(text).toBeInTheDocument();
});