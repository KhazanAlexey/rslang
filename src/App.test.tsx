import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App2 from './App2';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App2 />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
