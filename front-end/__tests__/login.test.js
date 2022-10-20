import React from 'react'
import Login from '../pages/login'
import Router from 'next/router';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("test login", () => {
  const initialState = { name: 10 };
  const mockStore = configureStore();
  let store;

  it('Title "Login" should be displayed', async () => {

    store = mockStore(initialState);

    jest.spyOn(Router, 'useRouter').mockReturnValue([])

    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const usernameField = screen.getByLabelText('Username');
    const passwordField = screen.getByLabelText('Password');
    const buttonField = container.querySelector('#buttonLogin');

    // screen.getByRole('button', {name : /login/i})
    fireEvent.change(usernameField, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordField, { target: { value: 'password' } });
    // fireEvent.click(buttonLogin);
    userEvent.click(buttonField);
    
    
    // await act(() => {
    //   expect(global.fetch).toHaveBeenCalled();
    // });

    //     // const titleText = container.querySelector('#Name')?.textContent;
    expect(usernameField).toHaveValue('test@email.com');
    expect(passwordField).toHaveValue('password');
    //     console.log('ini isi console lognya', container)
  })
})