import { render, fireEvent} from "@testing-library/react"
import React from 'react'
import Profile from '../pages/profile'
import Router from 'next/router'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import userEvent from "@testing-library/user-event";

describe("test profile", ()=>{
    const initialState = { name: 10 };
    const mockStore = configureStore();
    let store;

    it('Testing form update profile', () => {
        store = mockStore(initialState);

        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue('')
        });

        jest.spyOn(Router, 'useRouter').mockReturnValue([])
        jest.spyOn(React, 'useState').mockReturnValueOnce([{
            name: '',
            email: '',
            username: '',
            password: '',
            address: '',
            desc: '',
        }, () => {}])

        const onSubmit = jest.fn()
        
        const { container } = render(
            <Provider store={store} onSubmit={onSubmit}>
                <Profile />
            </Provider>
        );
        
        const nameField = container.querySelector('#Name');
        const emailField = container.querySelector('#Email');
        const usernameField = container.querySelector('#Username');
        const addressField = container.querySelector('#Address');
        const descField = container.querySelector('#Desc');
        const buttonField = container.querySelector('#buttonUpdate');
        
        fireEvent.change(nameField, { target: { value: 'testing' } });
        fireEvent.change(emailField, { target: { value: 'test@email.com' } });
        fireEvent.change(usernameField, { target: { value: 'test' } });
        fireEvent.change(addressField, { target: { value: 'jakarta' } });
        fireEvent.change(descField, { target: { value: 'tesc desc' } });
        userEvent.click(buttonField);

        expect(nameField).toHaveValue('testing');
        expect(emailField).toHaveValue('test@email.com');
        expect(usernameField).toHaveValue('test');
        expect(addressField).toHaveValue('jakarta');
        expect(descField).toHaveValue('tesc desc')

    })
})