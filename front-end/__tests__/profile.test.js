import { render } from '@testing-library/react';
import React from 'react';
import Profile from '../pages/profile';
import Router from 'next/router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('test profile', () => {
  const initialState = { name: 10 };
  const mockStore = configureStore();
  let store;

  fit('Title "My Profile" should be displayed', () => {
    store = mockStore(initialState);

    jest.spyOn(Router, 'useRouter').mockReturnValue([]);
    // const history = createMemoryHistory();
    // history.push('/');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(''),
    });
    jest.spyOn(React, 'useState').mockReturnValue(['', () => {}]);

    const { container } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    const titleText = container.querySelector('#Name')?.textContent;
    expect(titleText).toEqual('My Profile');
    console.log('ini isi console lognya', container);
  });
});
