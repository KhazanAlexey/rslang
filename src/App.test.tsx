import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App2 from './App2'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App2 />
      <App />
    </Provider>,
  )

  expect(getByText(/learn/i)).toBeInTheDocument()
})
