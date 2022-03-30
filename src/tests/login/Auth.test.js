import { render, screen, fireEvent } from '@testing-library/react';
import {setToken, fetchToken, RequireToken} from '../../components/login/Auth';
import { BrowserRouter } from "react-router-dom";

test('token set and fetched', () => {
    setToken('something')
    expect(fetchToken() == 'something')
});

// TODO test require token