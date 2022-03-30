import { render, screen, fireEvent } from '@testing-library/react';
import {setToken, fetchToken, RequireToken} from '../../components/login/Auth';
import { BrowserRouter } from "react-router-dom";

test('token feched ', () => {
    setToken('something')
    expect(fetchToken() == 'something')
});

// TODO test require token