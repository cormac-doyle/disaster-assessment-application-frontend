import { setToken, fetchToken, RequireToken } from '../../components/login/Auth';


test('token set and fetched', () => {
    setToken('something')
    expect(fetchToken() == 'something')
});

// TODO test require token
