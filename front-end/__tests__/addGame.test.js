import { render, fireEvent} from "@testing-library/react"
import React from 'react'
import AddGame from '../pages/games/add'
import Router from 'next/router'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import userEvent from "@testing-library/user-event";

describe("test add game form", ()=>{
    const initialState = { name: 10 };
    const mockStore = configureStore();
    let store;

    it('Testing form add game', () => {
        store = mockStore(initialState);

        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue('')
        });

        jest.spyOn(Router, 'useRouter').mockReturnValue([])
        jest.spyOn(React, 'useState').mockReturnValue(['', () => {}])
        
        const { container } = render(
            <Provider store={store}>
                <AddGame />
            </Provider>
        );
        
        const nameField = container.querySelector('#Name');
        const descField = container.querySelector('#Desc');
        const buttonField = container.querySelector('#buttonUpdate');
        
        fireEvent.change(nameField, { target: { value: 'testing' } });
        fireEvent.change(descField, { target: { value: 'tesc desc' } });
        userEvent.click(buttonField);
        
        expect(nameField).toHaveValue('testing');
        expect(descField).toHaveValue('tesc desc');

    })
})