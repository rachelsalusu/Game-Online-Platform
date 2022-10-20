import React from 'react'
import Register from '../pages/register'
import Router from 'next/router';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { render, fireEvent,  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("test register", () => {
  const initialState = { name: 10 };
  const mockStore = configureStore();
  let store;

  it('Title "Register" should be displayed', async () => {

    store = mockStore(initialState);

    jest.spyOn(Router, 'useRouter').mockReturnValue([])

    const { container } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    
    const emailField = container.querySelector('#Email');
    const usernameField = container.querySelector('#Username');
    const passwordField = container.querySelector('#Password');
    const confPasswordField = container.querySelector('#confPassword');
    // const handleClick = jest.fn()
    const buttonField = container.querySelector('#buttonRegister');
    // screen.getByRole('button', {name : /submit/i})

    fireEvent.change(emailField, { target: { value: 'test@gmail.com' } });
    fireEvent.change(usernameField, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordField, { target: { value: 'password' } });
    fireEvent.change(confPasswordField, { target: { value: 'password' } });
    // fireEvent.click(screen.getByText(/submit/i));
    // expect(handleClick).toHaveBeenCalledTimes(1)
    userEvent.click(buttonField);
    
    expect(emailField).toHaveValue('test@gmail.com');
    expect(usernameField).toHaveValue('test@email.com');
    expect(passwordField).toHaveValue('password');
    expect(confPasswordField).toHaveValue('password');
  })
})