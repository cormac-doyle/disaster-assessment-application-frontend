import UserStatus from "../components/UserStatus";
import { render } from '@testing-library/react';

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